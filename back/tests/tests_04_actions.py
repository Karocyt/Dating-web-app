import requests, time, datetime, random, os
from constants import url, user1, user2
from utils import (signup, login, validate, create, update, delete,
                    logout, get_profile, get_public_profile, like, unlike, block, unblock,
                    report)

def test_profile_not_connected():
    response = user1["session"].get(f"{url}/profile")
    assert response.status_code != 500

def test_blocks():
    login(user1)
    login(user2)

    response = user1["session"].get(f"{url}/users")
    print(response.json(), flush=True)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 1

    response = block(user2, user1)
    assert response.status_code == 200
    response = user1["session"].get(f"{url}/users")
    assert response.status_code == 200
    assert len(response.json()["users"]) == 0

    response = block(user2, user1)
    assert response.status_code == 400

    response = unblock(user2, user1)
    assert response.status_code == 200
    response = user1["session"].get(f"{url}/users")
    assert response.status_code == 200
    assert len(response.json()["users"]) == 1

    response = unblock(user2, user1)
    assert response.status_code == 400

    logout(user1)
    logout(user2)

def test_report():
    login(user1)
    delete(user1)
    create(user1)
    login(user1)
    response = update(user1, {"pictures": ["/test123", "456"]})
    assert response.status_code == 200
    login(user1)
    login(user2)
    response = report(user2, user1)
    assert response.status_code == 200
    response = report(user2, user1)
    assert response.status_code == 400
    response = like(user1, user2)
    assert response.status_code == 403
    delete(user1)
    create(user1)
    login(user1)
    response = update(user1, {"pictures": ["/test123", "456"]})
