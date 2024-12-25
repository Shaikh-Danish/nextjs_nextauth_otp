import React from 'react';

function FleetMonitoringTable({ fleets }: { fleets: any[] }) {
  return (
    <div className="mt-4 w-full">
      <div className="max-w-[98.5vw] overflow-x-auto border border-gray-300">
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
                className="border-b border-gray-300 text-[14px] hover:bg-muted/50"
              ></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetMonitoringTable;
