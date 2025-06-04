import type { IApiFeedback, IFeedback } from '@/interfaces';

export const mapApiToFeedback = ({
  feedback_id,
  sku,
  product_name,
  product_valuation,
  reply_text,
  ...rest
}: IApiFeedback): IFeedback => {
  return {
    ...rest,
    feedbackId: feedback_id,
    sku: sku.toString(),
    productName: product_name,
    productValuation: product_valuation,
    replyText: reply_text,
  };
};
