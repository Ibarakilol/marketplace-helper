from fastapi import APIRouter, HTTPException, status

from app.replier.service import ReplierService
from app.users.service import CurrentUser
from app.wb.models import WbFeedback

router = APIRouter(prefix="/replier", tags=["Replier"])


@router.post("/generate-feedback-reply", response_model=str | None)
def generate_feedback_reply(current_user: CurrentUser, feedback: WbFeedback):
    if not current_user.wb_supplier_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Отсутствует название продавца")

    reply = ReplierService.generate_feedback_reply(current_user=current_user, feedback=feedback)
    return reply
