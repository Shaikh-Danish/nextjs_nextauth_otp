import React from 'react';

import FleetMap from '@/components/fleet-monitoring/FleetMap';
import FleetUpdateForm from '@/components/fleet-monitoring/FleetUpdateForm';

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ vehicleNumber: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { vehicleNumber } = await params;
  const { status } = await searchParams;

  return (
    <div className="flex h-[calc(100vh-41px)] w-full">
      <div className="h-full w-[25%]">
        {/* <ShipmentUpdateForm
              shipment={shipment}
              updateShipment={handleUpdateShipment}
            /> */}
      </div>
      <div className="h-full w-[50%] border-x">
        <FleetMap />

        <FleetUpdateForm
          fleet={{
            vehicleNumber: 'MH123456',
            status: 'available',
            positions: [],
            driverName: 'John Doe',
            driverPhone: '1234567890',
          }}
        />
      </div>
      <div className="h-full w-[25%]"></div>
    </div>
  );
}

export default Page;
