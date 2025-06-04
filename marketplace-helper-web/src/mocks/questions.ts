import type { IApiQuestion } from '@/interfaces';

export const MOCK_API_QUESTIONS: IApiQuestion[] = [
  {
    id: '1',
    product_name: 'Футболка черная однотонная базовая без рисунка хлопок.',
    question_id: '1',
    sku: 7250481,
    text: 'эти футболки выцветают от солнца,именно черный цвет,ведь бывают же материалы,которые не выцветают,и мне нужна именно не выцветающач',
  },
  {
    id: '2',
    answer_text: 'Здравствуйте! 45 минут',
    product_name: 'Наушники беспроводные',
    question_id: '2',
    sku: 222604921,
    text: 'за сколько часов зарядка набирается?',
  },
  {
    id: '3',
    product_name: 'Блендер погружной',
    question_id: '3',
    sku: 293859675,
    text: 'здравствуйте зерновой кофе измельчит?',
  },
];
