import React from 'react';

import { CircleUser } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import LogoutButton from './LogoutButton';

function Profile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-7 w-7 cursor-pointer rounded-full">
          <CircleUser className="h-6 w-6" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[200px]" align="end">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <LogoutButton />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(Profile);
