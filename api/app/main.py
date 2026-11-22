import os
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from app.db import get_session
from app.models import Signup, WaitlistIn

app = FastAPI(title="BolCash API")

# Browsers on these origins may call the API. Set CORS_ORIGINS="https://bolcash.com" in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        o.strip()
        for o in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
        if o.strip()
    ],
    allow_methods=["POST"],
    allow_headers=["content-type"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/waitlist", status_code=201)
def join_waitlist(
    body: WaitlistIn, session: Annotated[Session, Depends(get_session)]
) -> dict[str, bool]:
    session.add(Signup(**body.model_dump()))
    try:
        session.commit()
    except IntegrityError:  # the unique index on phone: this number is already in
        session.rollback()
        raise HTTPException(
            status_code=409, detail="This number is already on the waitlist"
        ) from None
    return {"ok": True}
