import type { InternalAxiosRequestConfig } from 'axios';

import { MOCK_API_FEEDBACKS } from './feedbacks';
import { MOCK_API_QUESTIONS } from './questions';
import { MOCK_API_TOKEN, MOCK_API_USER } from './users';

import { ApiResponseStatus, ApiRoute, RESPONSE_HEADERS_TOTAL_COUNT } from '@/constants';
import { parseJSON } from '@/utils';

const API_ROUTE_ID_REGEX = '([^/]+)';

export const getMockedApiResponse = ({
  data,
  method,
  url,
  params = {},
}: Required<InternalAxiosRequestConfig>) => {
  let requestPayload: any = {};

  if (data) {
    if (data instanceof FormData) {
      data.forEach((value, key) => {
        requestPayload[key] = parseJSON(value);
      });
    } else {
      requestPayload = JSON.parse(data);
    }
  }

  const mockedResponses: Record<string, Record<string, any>> = {
    get: {
      [ApiRoute.USERS_PROFILE]: () => {
        return { data: MOCK_API_USER };
      },
      [ApiRoute.WB_FEEDBACKS]: () => {
        const { limit = 10, offset = 0 } = params || {};
        const data = MOCK_API_FEEDBACKS;

        return {
          data: data.slice(offset, offset + limit),
          headers: { [RESPONSE_HEADERS_TOTAL_COUNT]: data.length },
        };
      },
      [ApiRoute.WB_QUESTIONS]: () => {
        const { limit = 10, offset = 0 } = params || {};
        const data = MOCK_API_QUESTIONS;

        return {
          data: data.slice(offset, offset + limit),
          headers: { [RESPONSE_HEADERS_TOTAL_COUNT]: data.length },
        };
      },
    },
    post: {
      [ApiRoute.USERS_REGISTER]: () => {
        return { data: MOCK_API_TOKEN };
      },
      [ApiRoute.USERS_LOGIN]: () => {
        return { data: MOCK_API_TOKEN };
      },
      [ApiRoute.WB_FEEDBACK_PROCESS]: () => {
        const { feedback_id } = requestPayload;
        const selectedFeedback = MOCK_API_FEEDBACKS.find(
          (feedback) => feedback.feedback_id === feedback_id
        );

        return {
          data: {
            ...selectedFeedback,
            reply_text:
              'Здравствуйте! Очень рады, что Вы остались довольны покупкой нашего товара и поставили высокую оценку! Наша команда постоянно работает над тем, чтобы предоставить клиентам высококачественные товары, которые будут радовать и приносить пользу. Пользуйтесь с удовольствием! Всего Вам наилучшего и отличного настроения!',
          },
        };
      },
      [ApiRoute.WB_QUESTION_PROCESS]: () => {
        const { question_id } = requestPayload;
        const selectedQuestion = MOCK_API_QUESTIONS.find(
          (question) => question.question_id === question_id
        );

        return {
          data: {
            ...selectedQuestion,
            reply_text: 'Добрый день! Спасибо за вопрос!',
          },
        };
      },
    },
    patch: {
      [ApiRoute.USERS_PROFILE]: () => {
        const { wb_api_key, wb_supplier_name } = requestPayload;

        return { data: { ...MOCK_API_USER, wb_api_key, wb_supplier_name } };
      },
    },
  };

  let response = mockedResponses[method]?.[url];

  const matchRoute = (
    route: string,
    callback: (firstId: string, secondId: string) => { data?: any; status?: ApiResponseStatus }
  ) => {
    const match = url.match(new RegExp(`^${route}$`));

    if (match) {
      response = () => {
        const [, firstId, secondId] = match;
        return callback(firstId, secondId);
      };
    }
  };

  switch (method) {
    case 'get':
      matchRoute(ApiRoute.WB_FEEDBACK(API_ROUTE_ID_REGEX), (wbFeedbackId) => {
        return { data: MOCK_API_FEEDBACKS.find((feedback) => feedback.id === wbFeedbackId) };
      });

      matchRoute(ApiRoute.WB_QUESTION(API_ROUTE_ID_REGEX), (wbQuestionId) => {
        return { data: MOCK_API_QUESTIONS.find((question) => question.id === wbQuestionId) };
      });

      break;
    default:
      break;
  }

  if (response) {
    return {
      status: ApiResponseStatus.SUCCESS,
      ...response(),
    };
  }
};
