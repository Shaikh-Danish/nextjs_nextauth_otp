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
          <CircleUser className="h-7 w-7" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-56" align="end">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <LogoutButton />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Profile;
