import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { getInterviewById } from '@/lib/actions/general.actions';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }: RouteParams) => {
  const { id } = await params;

  const Interview = await getInterviewById(id);
  if (!Interview) {
    return redirect('/');
  }
  const user = await getCurrentUser();
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="Interview Cover"
              height={40}
              width={40}
              className="rounded-xl object-cover size-[40px]"
            />
            <h3 className="capitalize ">{Interview.role} Interview</h3>
            <DisplayTechIcons techStack={Interview.techstack} />
          </div>
          <p className="bg-dark-200 px-4py2 rounded-lg h-fit capitalize">
            {Interview.type}
          </p>
        </div>
      </div>
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={Interview.questions}
      />
    </>
  );
};

export default page;
