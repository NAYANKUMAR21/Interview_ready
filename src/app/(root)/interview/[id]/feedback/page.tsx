import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import {
  getFeedbackInterviewId,
  getInterviewById,
} from '@/lib/actions/general.actions';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const InterviewFeedbackPage = async ({ params }: RouteParams) => {
  // const getFeedBack = a
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) {
    redirect('/');
    return;
  }

  const feedback = await getFeedbackInterviewId({
    interviewId: id,
    userId: user?.id!,
  });
  console.log(feedback?.strengths);

  console.log(feedback);
  return (
    <>
      <section className="section-feedback bg-gradient-to-b from-white to-slate-100 p-8 rounded-2xl shadow-md ">
        <div className="flex flex-row justify-center mb-6">
          <h1 className="text-4xl font-semibold text-slate-800 text-center">
            Feedback on the Interview -{' '}
            <span className="capitalize text-primary-500">
              {interview.role}
            </span>{' '}
          </h1>
        </div>

        <div className="flex flex-row justify-center mb-8">
          <div className="flex flex-row gap-8 bg-white p-4 rounded-xl shadow-sm items-center">
            {/* Overall Impression */}
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p className="text-slate-700">
                Overall:{' '}
                <span className="text-primary-500 font-bold">
                  {feedback?.totalScore}
                </span>
                /100
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p className="text-slate-600 text-sm">
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format('MMM D, YYYY h:mm A')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-300 mb-6" />

        <p className="text-slate-700 text-lg mb-6">
          {feedback?.finalAssessment}
        </p>

        {/* Interview Breakdown */}
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Breakdown of the Interview:
          </h2>
          {feedback?.categoryScores?.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-slate-800">
                {index + 1}. {category.name} ({category.score}/100)
              </p>
              <p className="text-slate-700">{category.comment}</p>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="flex flex-col gap-3 mb-6">
          <h3 className="text-lg font-semibold text-green-800 capitalize">
            Strengths
          </h3>
          <ul className="list-disc list-inside ">
            {feedback?.strengths?.map((strength, index) => (
              <li key={index} className="text-black">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="flex flex-col gap-3 mb-8">
          <h3 className="text-lg font-semibold text-red-600 capitalize">
            Areas for Improvement
          </h3>
          <ul className="list-disc list-inside text-slate-700">
            {feedback?.areasForImprovement?.map((area, index) => (
              <li key={index} className="text-black">
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="btn-secondary flex-1 bg-slate-200 hover:bg-slate-300 rounded-xl transition">
            <Link href="/" className="flex w-full justify-center">
              <p className="text-sm font-semibold text-white text-center">
                Back to dashboard
              </p>
            </Link>
          </Button>

          <Button className="btn-primary flex-1 bg-primary-500 hover:bg-primary-600 text-black rounded-xl transition">
            <Link
              href={`/interview/${id}`}
              className="flex w-full justify-center"
            >
              <p className="text-sm font-semibold text-black text-center">
                Retake Interview
              </p>
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default InterviewFeedbackPage;
