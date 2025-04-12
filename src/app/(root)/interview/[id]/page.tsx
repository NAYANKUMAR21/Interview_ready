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
      <div className="flex flex-row justify-between items-start gap-6 p-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 shadow-md max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-row items-center gap-6 max-sm:flex-col max-sm:items-start">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="Interview Cover"
              height={40}
              width={40}
              className="rounded-xl object-cover size-[40px] shadow-sm"
            />
            <h3 className="text-lg font-semibold text-white capitalize">
              {Interview.role} Interview
            </h3>
            <DisplayTechIcons techStack={Interview.techstack} />
          </div>
          <p className="bg-slate-600 text-slate-100 px-5 py-2 text-sm rounded-full capitalize shadow-sm">
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
