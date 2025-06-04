from fastapi import APIRouter, HTTPException, status

from app.users.service import CurrentUser
from app.wb.models import WbFeedback, WbQuestion
from app.wb.service import WbService

router = APIRouter(prefix="/wb", tags=["Wildberries"])


@router.get("/feedbacks", response_model=list[WbFeedback])
async def get_wb_feedbacks(current_user: CurrentUser, skip: int = 0, limit: int = 100):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    feedbacks = await WbService.get_feedbacks(current_user=current_user, skip=skip, limit=limit)
    return feedbacks


@router.get("/feedbacks/{feedback_id}", response_model=WbFeedback)
async def get_wb_feedback(current_user: CurrentUser, feedback_id: str):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    feedback = await WbService.get_feedback(current_user=current_user, feedback_id=feedback_id)
    return feedback


@router.post("/feedbacks/process-feedback", response_model=WbFeedback)
async def process_wb_feedback(current_user: CurrentUser, feedback_id: str):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    feedback = await WbService.process_feedback(current_user=current_user, feedback_id=feedback_id)
    return feedback


@router.get("/questions", response_model=list[WbQuestion])
async def get_wb_questions(current_user: CurrentUser, skip: int = 0, limit: int = 100):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    questions = await WbService.get_questions(current_user=current_user, skip=skip, limit=limit)
    return questions


@router.get("/questions/{question_id}", response_model=WbQuestion)
async def get_wb_question(current_user: CurrentUser, question_id: str):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    question = await WbService.get_question(current_user=current_user, question_id=question_id)
    return question


@router.post("/questions/process-question", response_model=WbQuestion)
async def process_wb_question(current_user: CurrentUser, question_id: str):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует ключ авторизации")

    question = await WbService.process_question(current_user=current_user, question_id=question_id)
    return question
