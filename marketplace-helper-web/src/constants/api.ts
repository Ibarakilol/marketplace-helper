export const RESPONSE_HEADERS_TOTAL_COUNT = 'x-total-count';

export enum ApiMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
}

export enum ApiResponseStatus {
  SUCCESS = 200,
  SUCCESS_CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export const ApiRoute = {
  USERS_REGISTER: 'users/register',
  USERS_LOGIN: 'users/login',
  USERS_PROFILE: 'users/profile',
  WB_FEEDBACKS: 'wb/feedbacks',
  WB_FEEDBACK: (feedbackId: string) => `wb/feedbacks/${feedbackId}`,
  WB_FEEDBACK_PROCESS: 'wb/feedbacks/process-feedback',
  WB_QUESTIONS: 'wb/questions',
  WB_QUESTION: (questionId: string) => `wb/questions/${questionId}`,
  WB_QUESTION_PROCESS: 'wb/questions/process-question',
};
