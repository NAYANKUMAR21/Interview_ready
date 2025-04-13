import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { isAuthenticated, Logout } from '@/lib/actions/auth.actions';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuth = await isAuthenticated();

  if (!isUserAuth) {
    redirect('/sign-in');
    return;
  }

  return (
    <div className="root-layout">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={38} height={32} />
            <h2 className="text-lg font-semibold">MockMate</h2>
          </Link>
        </div>
        <div>
          <Button
            className="btn-call bg-indigo-400 hover:bg-white hover:text-black"
            onClick={Logout}
          >
            Logout
          </Button>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
