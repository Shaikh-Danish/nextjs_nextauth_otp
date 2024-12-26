'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import classNames from 'classnames';

import { useAppSelector } from '@/redux/store';

function Page() {
  const pathname = usePathname();

  const vehicleNumber = pathname.split('/')[2];

  const isExpanded = useAppSelector(state => state.sidebarToggle.value);

  return (
    <div
      className={classNames({
        'flex h-[calc(100vh-41px)] w-full': true,
        // 'w-[calc(100vw-200px)]': isExpanded,
        // 'w-[calc(100vw-56px)]': !isExpanded,
      })}
    >
      <div
        className={classNames({
          'h-full w-[25%]': true,
        })}
      >
        {/* <ShipmentUpdateForm
              shipment={shipment}
              updateShipment={handleUpdateShipment}
            /> */}
      </div>
      <div
        className={classNames({
          'h-full w-[50%] border-x border-gray-300': true,
        })}
      >
        <div>{/* <ShipmentMap positions={[position]} /> */}</div>
        <div></div>
      </div>
      <div
        className={classNames({
          'h-full w-[25%]': true,
        })}
      ></div>
    </div>
  );
}

export default Page;
