import React from 'react';

import Hamburger from './Hamburger';
import Profile from './Profile';

function Header() {
  return (
    <header className="header flex h-[47.5px] w-full items-center justify-between border-gray-300 px-1 pr-2 max-md:flex max-md:justify-between max-md:px-3 md:border-b">
      <Hamburger />
      <Profile />
    </header>
  );
}

export default React.memo(Header);
