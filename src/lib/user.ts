import { serverEnvironment } from '@/config/environment';

type UserResponse =
  | {
      status: 'success';
      data: {
        name: string;
        phoneNumber: string;
        drivers: {
          driverName: string;
          driverNumber: string;
          vehicleNumber: string;
        }[];
      };
    }
  | { status: 'not_found'; message: string };

type VerifyUserResponse =
  | {
      status: 'success';
      data: string;
    }
  | { status: 'not_found'; message: string };

export async function getUser(
  phoneNumber: number | string,
): Promise<VerifyUserResponse> {
  try {
    const response = await fetch(
      `${serverEnvironment.GOOGLE_SHEET_URL}?user-number=${phoneNumber}&action=verify`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.text();

    if (data === 'false') {
      throw new Error('User not found');
    }

    return { status: 'success', data };
  } catch (error: any) {
    return {
      status: 'not_found',
      message: error.message || 'Failed to fetch user',
    };
  }
}
