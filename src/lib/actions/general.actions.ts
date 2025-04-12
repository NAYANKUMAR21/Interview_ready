'use server';
import { generateObject } from 'ai';
import { db } from '../../../firebase/admin';
import { google } from '@ai-sdk/google';
import { feedbackSchema } from '../../../constants';

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  console.log(userId);
  const interviews = await db
    .collection('interviews')
    .where('userid', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
export async function getLatestInterview(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 10 } = params;
  const interviews = await db
    .collection('interviews')
    .where('finalised', '==', true)
    .where('userid', '!=', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interviews = await db.collection('interviews').doc(id).get();

  return interviews.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;
  try {
    const formatedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `-${sentence.role}: ${sentence.content}\n`
      )
      .join('');

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google('gemini-2.0-flash-001', {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formatedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        'You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories',
    });
    const feedbackStore = await db.collection('feedback').add({
      interviewId,
      totalScore,
      userId,
      categoryScores,
      strengths,
      areasForImprovement,
      createdAt: new Date().toISOString(),
      finalAssessment,
    });

    return { success: true, feedbackId: feedbackStore.id };
  } catch (er) {
    console.error('Error saving feedback', er);
    return { success: false };
  }
}
export async function getFeedbackInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  const feedback = await db
    .collection('feedback')
    .where('interviewId', '==', interviewId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (feedback.empty) {
    return null;
  }
  const feedbackdoc = feedback.docs[0];
  return {
    id: feedbackdoc.id,
    ...feedbackdoc.data(),
  } as Feedback;
}
