import { doGet, doPost } from './axios-config';

import { mapApiToFeedback, mapApiToQuestion } from '@/adapters';
import { ApiRoute } from '@/constants';
import type { IApiFeedback, IApiQuestion, IFeedback, IQuestion, TApiResponse } from '@/interfaces';

export const fetchWbFeedbacks = async (): Promise<TApiResponse<IFeedback[]>> => {
  try {
    const { data } = await doGet<IApiFeedback[]>(ApiRoute.WB_FEEDBACKS);

    return { isSuccess: true, data: data.map(mapApiToFeedback) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchWbFeedback = async (feedbackId: string): Promise<TApiResponse<IFeedback>> => {
  try {
    const { data } = await doGet<IApiFeedback>(ApiRoute.WB_FEEDBACK(feedbackId));

    return { isSuccess: true, data: mapApiToFeedback(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchProcessWbFeedback = async (
  feedbackId: string
): Promise<TApiResponse<IFeedback>> => {
  try {
    const { data } = await doPost<IApiFeedback>(ApiRoute.WB_FEEDBACK_PROCESS, {
      feedback_id: feedbackId,
    });

    return { isSuccess: true, data: mapApiToFeedback(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchWbQuestions = async (): Promise<TApiResponse<IQuestion[]>> => {
  try {
    const { data } = await doGet<IApiQuestion[]>(ApiRoute.WB_QUESTIONS);

    return { isSuccess: true, data: data.map(mapApiToQuestion) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchWbQuestion = async (questionId: string): Promise<TApiResponse<IQuestion>> => {
  try {
    const { data } = await doGet<IApiQuestion>(ApiRoute.WB_QUESTION(questionId));

    return { isSuccess: true, data: mapApiToQuestion(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchProcessWbQuestion = async (
  questionId: string
): Promise<TApiResponse<IQuestion>> => {
  try {
    const { data } = await doPost<IApiQuestion>(ApiRoute.WB_QUESTION_PROCESS, {
      question_id: questionId,
    });

    return { isSuccess: true, data: mapApiToQuestion(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};
