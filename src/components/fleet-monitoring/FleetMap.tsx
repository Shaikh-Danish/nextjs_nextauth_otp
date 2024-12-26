import React from 'react';

import Map from '@/components/map/Map';

export default function FleetMap() {
  return (
    <div className="border-b border-gray-300">
      <div className="p-1.5">
        <Map positions={[]} />
      </div>
    </div>
  );
}
