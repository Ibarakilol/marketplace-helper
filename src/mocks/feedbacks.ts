import type { IApiFeedback } from '@/interfaces';

export const MOCK_API_FEEDBACKS: IApiFeedback[] = [
  {
    id: '1',
    feedback_id: '1',
    sku: 293859675,
    product_name: 'Блендер погружной',
    product_valuation: 5,
    name: 'Юлия',
    text: 'Мне понравился товар спасибо продавцу 👍 рекомендую.',
    with_photo: true,
  },
  {
    id: '2',
    feedback_id: '2',
    sku: 149999936,
    product_name: 'Гантели разборные с грифом набор 20 кг',
    product_valuation: 4,
    name: 'Регина',
    text: 'Мне понравился товар спасибо продавцу 👍 рекомендую.',
    with_photo: true,
  },
  {
    id: '3',
    feedback_id: '3',
    sku: 50401251,
    product_name: 'Мышь беспроводная компьютерная 1600 dpi',
    product_valuation: 5,
    name: 'Антон',
    text: 'Мне понравился товар спасибо продавцу 👍 рекомендую.',
    with_photo: false,
  },
  {
    id: '4',
    feedback_id: '4',
    sku: 222604921,
    product_name: 'Наушники беспроводные',
    product_valuation: 5,
    name: 'Дмитрий',
    reply_text: 'Добрый день, Дмитрий! Спасибо за отзыв!',
    text: 'Мне понравился товар спасибо продавцу 👍 рекомендую.',
    with_photo: true,
  },
  {
    id: '5',
    feedback_id: '5',
    sku: 259137678,
    product_name: 'Нейлоновый кабель Lightning - Type C',
    product_valuation: 4,
    name: 'Алена',
    text: 'Мне понравился товар спасибо продавцу 👍 рекомендую.',
    with_photo: false,
  },
];
