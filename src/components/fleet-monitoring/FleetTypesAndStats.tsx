'use client';

import React from 'react';

import classNames from 'classnames';

import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';

import { useAppSelector } from '@/redux/store';
import { setFleetSelectedType } from '@/redux/features/fleet-type-slice';

function FleetTypesAndStats() {
  const dispatch = useDispatch();

  const sidebarToggle = useAppSelector(state => state.sidebarToggle.value);
  const fleetType = useAppSelector(state => state.fleetType.value);

  const stats = React.useMemo(
    () => [
      { label: 'All Vehicles', key: 'all', value: 1124, color: 'bg-blue-500' },
      {
        label: 'On Duty Vehicles',
        key: 'on-duty',
        value: 540,
        color: 'bg-green-500',
      },
      {
        label: 'Enroute For Pickup',
        key: 'enroute-for-pickup',
        value: 6,
        color: 'bg-yellow-500',
      },
      {
        label: 'At Pickup',
        key: 'at-pickup',
        value: 72,
        color: 'bg-purple-500',
      },
      {
        label: 'In Transit',
        key: 'in-transit',
        value: 355,
        color: 'bg-indigo-500',
      },
      {
        label: 'At Unloading',
        key: 'at-unloading',
        value: 87,
        color: 'bg-pink-500',
      },
      {
        label: 'Empty Movement',
        key: 'empty-movement',
        value: 20,
        color: 'bg-orange-500',
      },
      {
        label: 'Maintenance',
        key: 'maintenance',
        value: 25,
        color: 'bg-red-500',
      },
      { label: 'Off Duty', key: 'off-duty', value: 42, color: 'bg-gray-500' },
      {
        label: 'Available Vehicles',
        key: 'available-vehicles',
        value: 517,
        color: 'bg-teal-500',
      },
    ],
    [],
  );

  return (
    <div
      className={classNames({
        'w-[calc(100vw-56px)]': !sidebarToggle,
        'w-[calc(100vw-200px)]': sidebarToggle,
      })}
    >
      <div className="no-scrollbar flex min-w-full gap-x-4 overflow-x-scroll border-b border-gray-300 px-2 py-1.5">
        {stats.map(stat => (
          <div key={stat.key} className="w-[210px]">
            <Button
              className={classNames({
                'w-full bg-transparent shadow-none': true,
                'rounded-none border-b border-primary text-primary hover:bg-transparent':
                  fleetType === stat.key,
                'rounded-sm border-none hover:bg-primary/[.4]':
                  fleetType !== stat.key,
              })}
              onClick={() => {
                dispatch(setFleetSelectedType(stat.key));
              }}
            >
              <div className="flex w-full items-center gap-x-2">
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-sm font-bold">{stat.value}</span>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(FleetTypesAndStats);
