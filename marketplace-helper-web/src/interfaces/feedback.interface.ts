export interface IApiFeedback {
  id: string;
  feedback_id: string;
  name: string;
  product_name: string;
  product_valuation: number;
  reply_text?: string;
  sku: number;
  text: string;
}

export interface IFeedback {
  id: string;
  feedbackId: string;
  name: string;
  productName: string;
  productValuation: number;
  replyText?: string;
  sku: string;
  text: string;
}
