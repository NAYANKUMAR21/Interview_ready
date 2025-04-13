'use server';

import { cookies } from 'next/headers';
import { auth, db } from '../../../firebase/admin';
const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
export async function signUp(params: SignUpParams) {
  const { uid, email, name } = params;

  try {
    // fetch to check user already exists
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'this email already in use',
      };
    }
    await db.collection('users').doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: 'User created successfully..',
    };
  } catch (er: any) {
    console.error('Error creating a user', er);
    if (er.code == 'auth/email-already-exists') {
      return {
        success: false,
        message: 'this email already in use',
      };
    }
    return { success: false, message: 'failed to create account' };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist, please created a account',
      };
    }
    await setSessioncCookie(idToken);
    return { success: true, message: 'User Logged in Successfully...' };
  } catch (er: any) {
    console.error('Error creating a user', er);

    return { success: false, message: 'failed to log into account' };
  }
}

export async function setSessioncCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,

    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
  });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection('users')
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }
    // console.log('userRecord', userRecord);
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (er) {
    console.log(er);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; //same as if(user){return true}else{return false}
}
export async function Logout() {
  const cookieStore = await cookies();

  const check = cookieStore.delete('session');
  console.log(check);
}
