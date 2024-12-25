'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

interface SidebarItemProps {
  id: number;
  link: string;
  name: string;
  Icon?: any;
  isExpanded: boolean;
  cn?: string;
}

function SidebarItem({ link, name, Icon, isExpanded }: SidebarItemProps) {
  const pathname = usePathname();

  const SideBarIcon = React.memo(() => {
    if (Icon) {
      return (
        <Icon
          className={classNames({
            'bg-primary text-white': pathname === link,
            'hover:text-primary': pathname !== link,
            'h-[1.55rem] w-[1.55rem]': true,
          })}
        />
      );
    }

    return <></>;
  });

  SideBarIcon.displayName = 'SideBarIcon';

  return (
    <>
      <div
        className={classNames({
          'bg-primary text-white':
            pathname === link ||
            (link === '/in-transit' &&
              (pathname === '/at-unloading' || pathname === '/completed')),
          'hover:text-primary': pathname !== link,
          'pl-4': isExpanded,
          'px-4': !isExpanded,
          'border-border-primary border-l-[1px] p-0 pl-5 pt-2 hover:border-primary':
            !Icon,
          'my-1 py-2': !!Icon,
          'flex w-full cursor-pointer': true,
        })}
      >
        <Link href={link} className="flex gap-x-3" prefetch={false}>
          <SideBarIcon />
          {isExpanded ? name : ''}
        </Link>
      </div>
    </>
  );
}

export default React.memo(SidebarItem);
