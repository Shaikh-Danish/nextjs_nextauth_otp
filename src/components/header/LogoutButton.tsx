'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    localStorage.clear();
    sessionStorage.clear();

    router.push('/signin');
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 border-none hover:bg-gray-200"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  );
}

function deleteAllCookies() {
  // Get all cookies
  const cookies = document.cookie.split(';');

  // Iterate through all cookies and delete them
  // cookies.forEach(cookie => {
  //   const eqPos = cookie.indexOf('=');
  //   const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

  //   // Delete each cookie by setting expiration to past date
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
  // });

  // Optional: Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
}

export default LogoutButton;
