import AuthForm from '@/components/AuthForm';
import React from 'react';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div>
      <AuthForm type="sign-in" />
    </div>
  );
};

export default page;
