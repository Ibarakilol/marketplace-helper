import re

from fastapi import HTTPException, status
from g4f.client import Client

from app.users.models import User
from app.wb.models import WbFeedback, WbQuestion

client = Client()


class ReplierService:
    @staticmethod
    def ask_gpt(prompt: str) -> str:
        response = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}])
        return response.choices[0].message.content

    @staticmethod
    def generate_reply(current_user: User, feedback: WbFeedback | None, question: WbQuestion | None) -> str | None:
        reply = f"Здравствуйте{f' {feedback.name}! ' if feedback.name else '! '}"
        prompt = ""
        # random_recommendations = []

        if feedback:
            prompt = f"Напиши ответ на положительный отзыв {f'{feedback.text}' if feedback.text else ''}, на товар {feedback.product_name}, без приветствия,"

            # if len(random_recommendations) >= 2:
            #     prompt += f" порекомендуй товары {random_recommendations[0]} и {random_recommendations[1]},"
            # elif len(random_recommendations) == 1:
            #     prompt += f" порекомендуй товар {random_recommendations[0]},"

            if current_user.wb_supplier_name:
                prompt += f" c пожеланиями в конце от команды {current_user.wb_supplier_name}"

            prompt += f" и длиной текста не более 800 знаков."
        elif question:
            prompt = f"Напиши краткий ответ на вопрос клиента: {question.text}, по товару {question.product_name}, без приветствия, и c длиной текста не более 500 знаков."

        try:
            chat_response = ReplierService.ask_gpt(prompt)

            if chat_response:
                reply += chat_response
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ошибка генерации ответа")

        reply = re.sub(r"\r?\n|\r", " ", reply).strip()
        return re.sub(r"\s\s+", " ", reply)
