'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function FleetMonitoringTable({ fleets }: { fleets: any[] }) {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="max-w-[98.5vw] overflow-x-auto border-b border-gray-300">
        <table className="min-w-full overflow-x-scroll">
          <thead className="min-w-full border-b border-gray-300 bg-muted">
            <tr className="text-left text-[16px] text-gray-600">
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Origin</th>
              <th className="px-4 py-3 font-medium">Destination</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {fleets.map(fleet => (
              <tr
                key={Date.now()}
                className="cursor-pointer border-b border-gray-300 text-[14px] last:border-b-0 hover:bg-[#e7e6e6]"
                onClick={() => {
                  router.push(`/fleet-monitoring/${fleet.vehicleNumber}`);
                }}
              >
                <td className="px-4 py-3">
                  <p className="text-[14px] font-semibold text-primary">
                    {fleet.vehicleNumber}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {fleet.vehicleType}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-[14px] font-semibold text-primary">
                    {fleet.driverName}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {fleet.driverNumber}
                  </p>
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetMonitoringTable;
