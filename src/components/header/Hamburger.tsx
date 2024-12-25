'use client';

import React from 'react';

import classNames from 'classnames';

import { Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { toggle } from '@/redux/features/sidebar-toggle-slice';

function Hamburger() {
  const dispatch = useDispatch();

  return (
    <div
      className={classNames({
        'cursor-pointer transition-all duration-300': true,
      })}
      onClick={() => dispatch(toggle())}
    >
      <Menu className="ml-3 h-[25px] w-[25px] text-gray-400 hover:text-primary" />
    </div>
  );
}

const MemoizedHamburger = React.memo(Hamburger);

MemoizedHamburger.displayName = 'Hamburger';

export default MemoizedHamburger;
