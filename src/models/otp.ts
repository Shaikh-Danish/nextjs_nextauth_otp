import crypto from 'node:crypto';

import mongoose, { Document, Model, Schema } from 'mongoose';

export enum OtpPurpose {
  PASSWORD_RESET = 'PASSWORD_RESET',
  ACCOUNT_VERIFICATION = 'ACCOUNT_VERIFICATION',
  TWO_FACTOR_AUTH = 'TWO_FACTOR_AUTH',
  LOGIN = 'LOGIN',
}

export enum OtpStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  CONSUMED = 'CONSUMED',
}

interface IOtp {
  phoneNumber: number;
  otp: string;
  purpose: OtpPurpose;
  status: OtpStatus;
  expiresAt: Date;
  createdAt: Date;
  attempts: number;
  maxAttempts: number;
  salt: string;
}

interface OtpModel extends Model<IOtp> {
  generateAndSaveOtp(
    purpose: OtpPurpose,
    phoneNumber?: string,
  ): Promise<boolean>;
  verifyOtp(
    phoneNumber: number,
    candidateOtp: string,
    purpose: OtpPurpose,
  ): Promise<boolean>;
}

const OtpSchema = new Schema<IOtp, OtpModel>(
  {
    phoneNumber: {
      type: Number,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: Object.values(OtpPurpose),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OtpStatus),
      default: OtpStatus.PENDING,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    maxAttempts: {
      type: Number,
      default: 5,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

OtpSchema.static(
  'verifyOtp',
  async function (
    phoneNumber: number,
    candidateOtp: string,
    purpose: OtpPurpose,
  ): Promise<boolean> {
    try {
      const document = await this.aggregate([
        {
          $match: {
            phoneNumber,
            purpose,
            status: OtpStatus.PENDING,
            expiresAt: { $gt: new Date() },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

      if (!document) {
        return false;
      }

      const otpDocument: IOtp = document[0];

      otpDocument.attempts += 1;

      if (otpDocument.attempts >= otpDocument.maxAttempts) {
        otpDocument.status = OtpStatus.EXPIRED;
        return false;
      }

      const hashedCandidate = crypto
        .pbkdf2Sync(candidateOtp, otpDocument.salt, 1000, 64, 'sha512')
        .toString('hex');

      const isValid = hashedCandidate === otpDocument.otp;

      if (isValid) {
        otpDocument.status = OtpStatus.VERIFIED;
      }

      await this.updateOne(
        { _id: (otpDocument as any)._id },
        { $set: otpDocument },
      );

      return isValid;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },
);

OtpSchema.static(
  'generateAndSaveOtp',
  async function (purpose: OtpPurpose, phoneNumber?: string): Promise<boolean> {
    try {
      const otp = Math.floor(100_000 + Math.random() * 900_000).toString();

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const salt = crypto.randomBytes(16).toString('hex');
      const hashedOtp = crypto
        .pbkdf2Sync(otp, salt, 1000, 64, 'sha512')
        .toString('hex');

      console.log(otp);

      const otpDocument = await this.create({
        phoneNumber: Number(phoneNumber),
        otp: hashedOtp,
        purpose,
        expiresAt,
        status: OtpStatus.PENDING,
        salt,
      });

      if (otpDocument) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

const Otp = (mongoose.models.Otp ||
  mongoose.model<IOtp, OtpModel>('Otp', OtpSchema)) as OtpModel;
// const Otp = mongoose.model<IOtp, OtpModel>('Otp', OtpSchema);

export default Otp;
