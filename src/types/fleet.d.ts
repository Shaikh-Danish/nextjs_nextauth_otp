declare interface Fleet {
  vehicleNumber: string;
  vehicleType: string;
  status: FleetStatus;
  positions: {
    latitude: number;
    longitude: number;
  }[];
  driverName: string;
  driverPhone: string;
}

declare type FleetStatus =
  | 'available'
  | 'enroute-for-pickup'
  | 'at-pickup'
  | 'in-transit'
  | 'at-unloading'
  | 'empty-movement'
  | 'on-duty'
  | 'off-duty'
  | 'maintenance';
