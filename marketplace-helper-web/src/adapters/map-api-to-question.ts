import type { IApiQuestion, IQuestion } from '@/interfaces';

export const mapApiToQuestion = ({
  answer_text,
  product_name,
  question_id,
  ...rest
}: IApiQuestion): IQuestion => {
  return {
    ...rest,
    answerText: answer_text,
    productName: product_name,
    questionId: question_id,
  };
};
