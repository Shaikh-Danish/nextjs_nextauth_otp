import React from 'react';

import FleetMonitoringFilter from '@/components/fleet-monitoring/FleetMonitoringFilter';
import FleetTypesAndStats from '@/components/fleet-monitoring/FleetTypesAndStats';
import FleetMonitoringTable from '@/components/fleet-monitoring/FleetMonitoringTable';

function FleetMonitoring() {
  return (
    <div className="w-full">
      <FleetMonitoringFilter />

      <FleetTypesAndStats />

      <FleetMonitoringTable
        fleets={[
          {
            vehicleNumber: 'MH45ak2323',
            vehicleType: 'MXL',
            driverName: 'John Doe',
            driverNumber: '9876543210',
          },
        ]}
      />
    </div>
  );
}

export default FleetMonitoring;
