import { Button } from '@/components/ui/button';
import Image from 'next/image';

import Link from 'next/link';
import { dummyInterviews } from '../../../constants';
import InterviewCard from '@/components/InterviewCard';
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview Ready</h2>
          <p className="text-lg">
            Practice on real Interview Questions & Get Feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          width={400}
          height={400}
          className="max-sm:hidden"
          alt="header image robot"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {/* <div> */}
          {dummyInterviews.map((ele, index) => {
            return <InterviewCard {...ele} key={index} />;
          })}
          {/* </div> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interview-section">
          <p>There are no interview avialable</p>
        </div>
      </section>
    </>
  );
}
