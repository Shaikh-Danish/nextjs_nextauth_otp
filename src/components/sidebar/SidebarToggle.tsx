import React from 'react';

// import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

interface SidebarToggleProps {
  isExpanded: boolean;
}

function SidebarToggle({ isExpanded }: SidebarToggleProps) {
  return (
    <div className="toggle absolute right-[-14px] top-3 cursor-pointer bg-white max-md:hidden">
      {isExpanded ? (
        <></>
      ) : (
        // <MdKeyboardArrowLeft className="h-[25px] w-[25px] rounded-full border-[0.5px] border-gray-700" />
        <></>
        // <MdKeyboardArrowRight className="h-[25px] w-[25px] rounded-full border-[0.5px] border-gray-700" />
      )}
    </div>
  );
}

const MemoizedSidebarToggle = React.memo(SidebarToggle);

MemoizedSidebarToggle.displayName = 'SidebarToggle';

export default MemoizedSidebarToggle;
