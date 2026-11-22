import re
from datetime import datetime, timedelta, timezone
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, StringConstraints, field_validator
from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel

# India has no daylight saving, so a fixed offset is exact.
IST = timezone(timedelta(hours=5, minutes=30))

Text100 = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]


class WaitlistIn(BaseModel):
    """What the website form sends. Nothing else is accepted."""

    model_config = ConfigDict(extra="forbid")

    name: Text100
    business_type: Literal["distributor", "trader", "kirana", "other"]
    city: Text100
    phone: str
    consent: Literal[True]  # anything but true is a 422
    source: Annotated[str, StringConstraints(pattern=r"^[a-z0-9/_-]{1,100}$")] = "home"

    @field_validator("phone", mode="before")
    @classmethod
    def clean_phone(cls, v: object) -> object:
        """Strip spaces and hyphens, then require a 10-digit Indian mobile number."""
        if not isinstance(v, str):
            return v
        digits = re.sub(r"[\s-]", "", v)
        if not re.fullmatch(r"[6-9]\d{9}", digits):
            raise ValueError("Enter a 10-digit Indian mobile number")
        return digits


class Signup(SQLModel, table=True):
    """One waitlist row. Only the form's data, plus the page it came from and when."""

    __tablename__ = "waitlist_signup"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    business_type: str
    city: str
    phone: str = Field(unique=True, index=True)  # one row per number
    consent: bool
    source: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(IST),
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )
