import os
from collections.abc import Iterator
from functools import lru_cache

from sqlalchemy.engine import Engine
from sqlmodel import Session, SQLModel, create_engine

from app.models import Signup  # noqa: F401  (registers the table)


def database_url() -> str:
    """DATABASE_URL, e.g. postgresql://user:pass@host/db. SQLite file in dev if unset."""
    url = os.environ.get("DATABASE_URL", "sqlite:///./waitlist.db")
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)  # use the psycopg 3 driver
    return url


@lru_cache
def get_engine() -> Engine:
    url = database_url()
    engine = create_engine(
        url, connect_args={"check_same_thread": False} if url.startswith("sqlite") else {}
    )
    # ponytail: create_all is enough for one table. Add Alembic before the schema first changes.
    SQLModel.metadata.create_all(engine)
    return engine


def get_session() -> Iterator[Session]:
    with Session(get_engine()) as session:
        yield session
