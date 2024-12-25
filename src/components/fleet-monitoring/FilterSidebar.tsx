'use client';

import React from 'react';

import { useDispatch } from 'react-redux';

import { Filter as FilterIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

function FilterSidebar() {
  const dispatch = useDispatch();

  //   const sidebarFilter = useAppSelector(state => state.shipmentFilter.value);

  //   const [filter, setFilter] = React.useState<Filter>(sidebarFilter);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  //   const handleShipmentTypeChange = (value: ShipmentType) => {
  //     setFilter(prev => ({ ...prev, shipmentType: value }));
  //   };

  //   const handleTatChange = (value: TatType) => {
  //     setFilter(prev => ({ ...prev, tat: value }));
  //   };

  //   const handlePtlTypeChange = (value: PtlType) => {
  //     setFilter(prev => ({ ...prev, ptlType: value }));
  //   };

  //   const handleDateChange = (date: { from: string; to: string }) => {
  //     if (date && date.from && date.to) {
  //       setFilter(prev => ({
  //         ...prev,
  //         date: {
  //           from: new Date(date.from).toISOString(),
  //           to: new Date(date.to).toISOString(),
  //         },
  //       }));
  //     }
  //   };

  const toggleSidebar = React.useCallback(
    () => setIsSidebarOpen(!isSidebarOpen),
    [isSidebarOpen],
  );

  return (
    <>
      {/* Main content */}
      <div className="flex justify-between">
        {/* <div>
          <input
            placeholder="Search Shipment..."
            className="rounded-none border-b border-gray-300 bg-background px-2 py-1.5 outline-none focus:border-red-700"
            onChange={e => {
              handleSearch(e.target.value);
            }}
          />
        </div> */}

        <div className="flex gap-x-3">
          <Button
            onClick={toggleSidebar}
            variant="outline"
            className="border border-gray-300 hover:border-primary hover:text-primary"
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filters
          </Button>

          {/* <ExportButton type={type} /> */}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-20 h-full w-80 transform border-l border-gray-300 bg-background shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="space-y-6">
            {/* SHIPMENT TYPE FILTER */}
            {/* <ShipmentTypeFilter
              shipmentType={filter.shipmentType}
              handleChange={handleShipmentTypeChange}
            /> */}

            {/* PTL TYPE FILTER */}
            {/* <PtlTypeFilter
              filter={filter}
              ptlType={filter.ptlType}
              handleChange={handlePtlTypeChange}
            /> */}

            {/* <TatFilter tatType={filter.tat} handleChange={handleTatChange} /> */}

            {/* DATE RANGE FILTER */}
            {/* <DateRangeFilter handleDateChange={handleDateChange} /> */}
          </div>
        </div>

        <div className="flex w-full gap-x-4 p-4">
          <Button
            variant="default"
            className="flex-1 rounded-sm border-[2px] bg-primary text-white hover:border-white"
            onClick={() => {
              //   dispatch(applyFilter(filter));
              //   handleApplyFilter(filter);
              toggleSidebar();
            }}
          >
            APPLY
          </Button>
          <Button
            variant="outline"
            // onClick={() => dispatch(resetFilter())}
            className="flex-1 rounded-sm border border-gray-300 hover:border-primary hover:bg-background hover:text-primary"
          >
            RESET
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(FilterSidebar);
