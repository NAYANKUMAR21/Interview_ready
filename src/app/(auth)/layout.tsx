import { isAuthenticated } from '@/lib/actions/auth.actions';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const Authlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuth = await isAuthenticated();

  if (isUserAuth) {
    redirect('/');
    return;
  }
  return <div className="auth-layout">{children}</div>;
};

export default Authlayout;
