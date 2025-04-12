'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import FormField from './FormField';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { signIn, signUp } from '../lib/actions/auth.actions';
import { auth } from '../../firebase/client';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in');
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error('Sign in Failed. Please try again.');
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success('Signed in successfully.');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === 'sign-in';

  return (
    <div className="border border-white/10 rounded-2xl lg:min-w-[566px] bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
      <div className="flex flex-col gap-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl py-14 px-10">
        {/* Logo and Title */}
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image src="/logo.png" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-2xl font-semibold tracking-wide">
            PrepWise
          </h2>
        </div>

        {/* Subtitle */}
        <h3 className="text-white text-lg text-center font-medium">
          Practice interviews with AI
        </h3>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 text-black"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
                // className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
              // className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              // className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
            />

            <Button
              type="submit"
              className="w-full py-3 px-6 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-xl font-medium transition-colors duration-200"
            >
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>

        {/* Toggle Link */}

        <p className="text-center text-sm text-neutral-300">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className="font-bold text-primary-300 hover:underline ml-1"
          >
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
