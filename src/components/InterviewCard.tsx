import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';

import { cn, getRandomInterviewCover } from '@/lib/utils';
import { getFeedbackInterviewId } from '@/lib/actions/general.actions';
// import { getFeedbackByInterviewId } from '@/lib/actions/general.action';

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  console.log(id, userId, role, type, techstack, createdAt);
  let feedback = null;
  if (userId && id) {
    feedback = await getFeedbackInterviewId({
      interviewId: id,
      userId,
    });
  }

  console.log(feedback);
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;

  const badgeColor =
    {
      Behavioral: 'bg-light-400',
      Mixed: 'bg-light-600',
      Technical: 'bg-light-800',
    }[normalizedType] || 'bg-light-600';

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format('MMM D, YYYY');

  return (
    <div className="card-container w-[360px] max-sm:w-full min-h-96 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg rounded-2xl p-6 transition hover:shadow-lg">
      <div className="relative flex flex-col justify-between h-full">
        {/* Type Badge */}
        <div
          className={cn(
            'absolute top-0 right-0 px-4 py-2 rounded-bl-xl text-sm font-semibold backdrop-blur-md',
            badgeColor
          )}
        >
          <p className="text-white tracking-wide">{normalizedType}</p>
        </div>

        {/* Cover Image */}
        <div className="flex justify-center">
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px] border-4 border-white shadow-md"
          />
        </div>

        {/* Interview Role */}
        <h3 className="mt-4 text-center text-lg font-semibold capitalize text-gray-800">
          {role} Interview
        </h3>

        {/* Date & Score */}
        <div className="flex justify-center gap-8 mt-4 text-sm ">
          <div className="flex items-center gap-2">
            <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
            <p className="text-black">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/star.svg" width={20} height={20} alt="star" />
            <p className="text-black">{feedback?.totalScore || '---'}/100</p>
          </div>
        </div>

        {/* Feedback or Placeholder Text */}
        <p className="text-gray-700 text-sm mt-4 line-clamp-2 text-center italic">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Tech stack + Button */}
        <div className="flex flex-row justify-between items-center mt-6">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary rounded-lg shadow-sm hover:shadow-md">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
