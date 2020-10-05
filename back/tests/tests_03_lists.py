import requests, time, datetime, random, os
from constants import url, user1, user2
from utils import (signup, login, validate, create, update, delete,
                    logout, get_profile, get_public_profile, like, unlike, block, unblock,
                    report)

def test_matches():
    login(user1)
    login(user2)
    response = like(user1, user2)
    # print(response, response.text)
    assert response.status_code == 403
    response = update(user1, {"pictures": ["/test123", "456"]})
    # print(response, response.text)
    assert response.status_code == 200
    response = update(user2, {"pictures": ["/test2"]})
    # print(response, response.text)
    assert response.status_code == 200

    response = like(user1, user2)
    # print(response, response.text)
    assert response.status_code == 200
    assert response.json()["match"] == False
    response = like(user2, user1)
    # print(response, response.text)
    assert response.status_code == 200
    assert response.json()["match"] == True

    response = user1["session"].get(f"{url}/matches")
    # print(response, response.text)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 1

    response = unlike(user2, user1)
    # print(response, response.text)
    assert response.status_code == 200
    assert response.json()["match"] == False
    response = user1["session"].get(f"{url}/matches")
    # print(response, response.text)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 0
    unlike(user1, user2)

    like(user1, user2)
    print(like(user2, user1).json(), flush=True)
    response = user1["session"].get(f"{url}/users")
    assert response.status_code == 200
    assert len(response.json()["users"]) == 0
    
    unlike(user1, user2)
    unlike(user2, user1)

    logout(user1)
    logout(user2)

def test_liked_by():
    login(user1)
    login(user2)

    response = user1["session"].get(f"{url}/liked_by")
    print(response, response.text)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 0

    response = like(user1, user2)
    print(response, response.text)
    assert response.status_code == 200

    response = user2["session"].get(f"{url}/liked_by")
    print(response, response.text)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 1
    
    like(user1, user2)
    like(user2, user1)

    response = user2["session"].get(f"{url}/liked_by")
    print(response, response.text)
    assert response.status_code == 200
    assert len(response.json()["users"]) == 1
    
    unlike(user1, user2)
    unlike(user2, user1)

    logout(user1)
    logout(user2)
