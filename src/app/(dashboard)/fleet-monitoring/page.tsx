import React from 'react';

import FleetMonitoringFilter from '@/components/fleet-monitoring/FleetMonitoringFilter';
import FleetTypesAndStats from '@/components/fleet-monitoring/FleetTypesAndStats';
import FleetMonitoringTable from '@/components/fleet-monitoring/FleetMonitoringTable';

function FleetMonitoring() {
  const fleets: Fleet[] = [
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'available',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'in-transit',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'enroute-for-pickup',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'at-pickup',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'empty-movement',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'on-duty',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'maintenance',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'off-duty',
      positions: [],
    },
    {
      vehicleNumber: 'MH45ak2323',
      vehicleType: 'MXL',
      driverName: 'John Doe',
      driverPhone: '9876543210',
      status: 'at-unloading',
      positions: [],
    },
  ];

  return (
    <div className="w-full">
      <FleetMonitoringFilter />

      <FleetTypesAndStats />

      <FleetMonitoringTable fleets={fleets} />
    </div>
  );
}

export default FleetMonitoring;
