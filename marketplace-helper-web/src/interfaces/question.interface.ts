export interface IApiQuestion {
  id: string;
  answer_text?: string;
  product_name: string;
  question_id: string;
  sku: number;
  text: string;
}

export interface IQuestion {
  id: string;
  answerText?: string;
  productName: string;
  questionId: string;
  sku: number;
  text: string;
}
