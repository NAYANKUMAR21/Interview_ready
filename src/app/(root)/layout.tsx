import { isAuthenticated } from '@/lib/actions/auth.actions';

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
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="./logo.svg" alt="logo" width={38} height={32} />
          <h2>PrepWises</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
