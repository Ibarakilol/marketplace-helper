from fastapi import APIRouter

from app.users.router import router as users_router
from app.wb.router import router as wb_router

api_router = APIRouter()
api_router.include_router(users_router)
api_router.include_router(wb_router)
