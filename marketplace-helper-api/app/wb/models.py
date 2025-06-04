from sqlmodel import Field, SQLModel


class WbFeedback(SQLModel):
    feedback_id: str = Field(unique=True, index=True)
    sku: int
    product_name: str = Field(max_length=255)
    product_valuation: int = Field(ge=1, le=5)
    name: str
    text: str | None = None
    with_photo: bool
    reply_text: str | None = None


class WbQuestion(SQLModel):
    question_id: str = Field(unique=True, index=True)
    product_name: str = Field(max_length=255)
    text: str
    answer_text: str | None = None
