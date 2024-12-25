'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { LayoutDashboard } from 'lucide-react';
import classNames from 'classnames';

import SidebarItem from './SidebarItem';

const MENU = [
  {
    id: 0,
    name: 'Dashboard',
    Icon: LayoutDashboard,
    link: '/',
  },
];

import { useAppSelector } from '@/redux/store';

function Sidebar() {
  const isExpanded = useAppSelector(state => state.sidebarToggle.value);

  return (
    <aside
      className={classNames({
        'w-[200px]': isExpanded,
        'w-14': !isExpanded,
        'nav transition-width duration-50 border-border-primary h-lvh border-r-[1px] bg-background':
          true,
      })}
    >
      <Link
        href="/"
        className={classNames({
          'my-2 flex text-lg font-semibold': true,
          'ml-2.5': !isExpanded,
          'ml-3': isExpanded,
        })}
        prefetch={false}
      >
        <Image src="/logo.jpg" alt="logo" width={35} height={35} />
      </Link>

      <div
        className={classNames({
          'w-[200px]': isExpanded,
          'w-14': !isExpanded,
          'mt-2 flex flex-col': true,
        })}
      >
        <div>
          {MENU.map(({ link, id, name, Icon }) => {
            return (
              <div
                className={classNames({
                  'flex w-full flex-col items-center': true,
                })}
                key={id}
              >
                <SidebarItem
                  key={id}
                  id={id}
                  link={link}
                  name={name}
                  Icon={Icon}
                  isExpanded={isExpanded}
                  cn="flex flex-col"
                />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

const MemoizedSidebar = React.memo(Sidebar);

MemoizedSidebar.displayName = 'Sidebar';

export default MemoizedSidebar;
