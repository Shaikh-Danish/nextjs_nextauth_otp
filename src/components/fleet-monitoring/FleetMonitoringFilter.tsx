import React from 'react';

import SearchBar from '@/components/components/SearchBar';
import FilterSidebar from '@/components/fleet-monitoring/FilterSidebar';

function FleetMonitoringHeader() {
  return (
    <div className="border-b border-gray-300 py-2">
      <div className="flex gap-x-3 px-2">
        <SearchBar className="w-[250px]" />
        <FilterSidebar />
      </div>
    </div>
  );
}

export default React.memo(FleetMonitoringHeader);
