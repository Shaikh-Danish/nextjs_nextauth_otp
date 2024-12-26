import React from 'react';

function FleetUpdateForm({ fleet }: { fleet: Fleet }) {
  if (!fleet) return null;

  if (fleet.status === 'available') {
    return <div>Available</div>;
  }

  if (fleet.status === 'enroute-for-pickup') {
    return <div>Enroute for Pickup</div>;
  }

  if (fleet.status === 'at-pickup') {
    return <div>At Pickup</div>;
  }

  if (fleet.status === 'in-transit') {
    return <div>In Transit</div>;
  }

  if (fleet.status === 'at-unloading') {
    return <div>At Unloading</div>;
  }

  if (fleet.status === 'empty-movement') {
    return <div>Empty Movement</div>;
  }

  if (fleet.status === 'on-duty') {
    return <div>On Duty</div>;
  }

  if (fleet.status === 'off-duty') {
    return <div>Off Duty</div>;
  }

  if (fleet.status === 'maintenance') {
    return <div>Maintenance</div>;
  }

  return <div>Unknown</div>;
}

export default FleetUpdateForm;
