import { Button } from '@/components/ui/button';
import Image from 'next/image';

import Link from 'next/link';

import InterviewCard from '@/components/InterviewCard';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import {
  getInterviewByUserId,
  getLatestInterview,
} from '@/lib/actions/general.actions';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterview({ userId: user?.id! }),
  ]);

  const hasPastInterview = userInterviews?.length > 0;
  const hasUpcomingInterview = latestInterviews?.length > 0;

  return (
    <>
      <section className="card-cta bg-gradient-to-r from-sky-900 via-indigo-900 to-purple-900 text-white px-6 py-10 rounded-2xl shadow-lg flex flex-col-reverse sm:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <h2 className="text-3xl font-semibold">Interview Ready..</h2>
          <p className="text-lg text-slate-200">
            Practice real interview questions and receive feedback to improve.
          </p>
          <Button
            asChild
            className="btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 max-sm:w-full"
          >
            <Link href="/interview">Start a New Interview</Link>
          </Button>
        </div>
        <Image
          src="https://png.pngtree.com/png-clipart/20250103/original/pngtree-futuristic-robot-using-laptop-cartoon-vector-artwork-png-image_20059325.png"
          width={300}
          height={300}
          className="max-sm:hidden"
          alt="Robot ready for interview"
        />
      </section>

      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Your Interviews
        </h2>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPastInterview ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">
              You haven&apos;t taken any interview yet.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Take an Interview
        </h2>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasUpcomingInterview ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">
              There are no new interviews available.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
