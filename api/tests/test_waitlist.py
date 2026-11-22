from collections.abc import Iterator
from datetime import datetime, timedelta

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.engine import Engine
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine, select

from app.db import get_session
from app.main import app
from app.models import IST, Signup

GOOD = {
    "name": "Ravi Kumar",
    "business_type": "distributor",
    "city": "Pune",
    "phone": "9876543210",
    "consent": True,
    "source": "home",
}


@pytest.fixture
def engine() -> Engine:
    e = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    SQLModel.metadata.create_all(e)
    return e


@pytest.fixture
def client(engine: Engine) -> Iterator[TestClient]:
    def session() -> Iterator[Session]:
        with Session(engine) as s:
            yield s

    app.dependency_overrides[get_session] = session
    yield TestClient(app)
    app.dependency_overrides.clear()


def rows(engine: Engine) -> list[Signup]:
    with Session(engine) as s:
        return list(s.exec(select(Signup)).all())


def test_valid_signup_is_stored(client: TestClient, engine: Engine) -> None:
    r = client.post("/waitlist", json=GOOD)
    assert r.status_code == 201
    [row] = rows(engine)
    assert (row.name, row.business_type, row.city, row.phone) == (
        "Ravi Kumar",
        "distributor",
        "Pune",
        "9876543210",
    )
    assert row.consent is True
    assert row.source == "home"
    now_ist = datetime.now(IST).replace(tzinfo=None)  # SQLite returns the IST wall time
    assert abs(row.created_at.replace(tzinfo=None) - now_ist) < timedelta(minutes=1)


def test_created_at_defaults_to_ist() -> None:
    s = Signup(
        name="a", business_type="other", city="b", phone="9876543210", consent=True, source="home"
    )
    assert s.created_at.utcoffset() == timedelta(hours=5, minutes=30)


def test_phone_spaces_are_stripped_and_name_trimmed(client: TestClient, engine: Engine) -> None:
    r = client.post("/waitlist", json={**GOOD, "phone": " 98765 43210 ", "name": "  Ravi  "})
    assert r.status_code == 201
    [row] = rows(engine)
    assert (row.phone, row.name) == ("9876543210", "Ravi")


@pytest.mark.parametrize("consent", [False, None, "true", 0])
def test_consent_must_be_true(client: TestClient, engine: Engine, consent: object) -> None:
    assert client.post("/waitlist", json={**GOOD, "consent": consent}).status_code == 422
    assert rows(engine) == []


def test_missing_consent_is_422(client: TestClient) -> None:
    body = {k: v for k, v in GOOD.items() if k != "consent"}
    assert client.post("/waitlist", json=body).status_code == 422


@pytest.mark.parametrize(
    "phone",
    ["", "12345", "98765432101", "5876543210", "98765abcde", "+919876543210", None, 9876543210],
)
def test_invalid_phone_is_422(client: TestClient, engine: Engine, phone: object) -> None:
    assert client.post("/waitlist", json={**GOOD, "phone": phone}).status_code == 422
    assert rows(engine) == []


def test_duplicate_phone_is_409_with_message(client: TestClient, engine: Engine) -> None:
    assert client.post("/waitlist", json=GOOD).status_code == 201
    # same number written with spaces, different person: still a duplicate
    r = client.post("/waitlist", json={**GOOD, "name": "Someone Else", "phone": "98765 43210"})
    assert r.status_code == 409
    assert r.json() == {"detail": "This number is already on the waitlist"}
    assert len(rows(engine)) == 1


@pytest.mark.parametrize(
    "change",
    [
        {"business_type": "bank"},
        {"business_type": "Distributor"},
        {"name": "   "},
        {"city": ""},
        {"source": "Has Spaces!"},
        {"email": "a@b.com"},  # no extra fields are accepted
    ],
)
def test_other_bad_input_is_422(client: TestClient, engine: Engine, change: dict[str, str]) -> None:
    assert client.post("/waitlist", json={**GOOD, **change}).status_code == 422
    assert rows(engine) == []


def test_source_defaults_to_home(client: TestClient, engine: Engine) -> None:
    body = {k: v for k, v in GOOD.items() if k != "source"}
    assert client.post("/waitlist", json=body).status_code == 201
    assert rows(engine)[0].source == "home"


def test_cors_allows_the_website_origin(client: TestClient) -> None:
    r = client.options(
        "/waitlist",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert r.status_code == 200
    assert r.headers["access-control-allow-origin"] == "http://localhost:3000"
