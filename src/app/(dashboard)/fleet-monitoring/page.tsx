import React from 'react';

import FleetMonitoringFilter from '@/components/fleet-monitoring/FleetMonitoringFilter';
import FleetTypesAndStats from '@/components/fleet-monitoring/FleetTypesAndStats';
import FleetMonitoringTable from '@/components/fleet-monitoring/FleetMonitoringTable';

function FleetMonitoring() {
  return (
    <div className="w-full">
      <FleetMonitoringFilter />

      <FleetTypesAndStats />

      <FleetMonitoringTable fleets={[]} />
    </div>
  );
}

export default FleetMonitoring;
