import requests, time, datetime, random, os
from .constants import url, user1, user2
from .utils import (signup, login, validate, create, update, delete,
                    logout, get_profile, get_public_profile, like, unlike, block, unblock,
                    report, reset)

def test_search():
    login(user1)
    response = user1["session"].get(f"{url}/search",
                                    json={'age': {'min': 18, 'max': 27}})
    assert response.status_code == 200
    assert response.json()["users"][0]["age"] < 27

    response = user1["session"].get(f"{url}/search",
                                    json={'tags': ['street']})
    assert response.status_code == 200
    print(response.json()["users"], flush=True)
    profile = user1["session"].get(f"{url}/users/{response.json()['users'][0]['id']}").json()
    print(profile, flush=True)
    assert 'street' in profile["tags"]

    response = user1["session"].get(f"{url}/search",
                                    json={'tags': ['street', 'rue']})
    assert response.status_code == 200
    profile = user1["session"].get(f"{url}/users/{response.json()['users'][0]['id']}").json()
    assert 'street' in profile["tags"] or 'rue' in profile["tags"]


    response = user1["session"].get(f"{url}/search",
                                    json={
                                            'age': {'min': 18, 'max': 99},
                                            'tags': ['rue', 'de']})
    assert response.status_code == 200
    profile = user1["session"].get(f"{url}/users/{response.json()['users'][0]['id']}").json()
    assert 'rue' in profile["tags"]
