import requests, time, datetime, random, os
from .constants import url, user1, user2
from .utils import (signup, login, validate, create, update, delete,
                    logout, get_profile, get_public_profile, like, unlike, block, unblock,
                    report, reset)

def test_upload():
    reset(user1, picture=False)
    login(user1)
    response = user1["session"].post(f"{url}/add_picture", files={'file': open('./medium_pcachin.jpg', 'rb')})
    print(response, flush=True)
    print(response.json(), flush=True)
    assert response.status_code == 201
    profile = response.json()
    pic_true_url = profile["pictures"][-1]
    pic_url = f"http://app:5000/pictures/{pic_true_url.split('/')[-1]}"
    print(pic_url, flush=True)
    response = user1["session"].get(pic_url)
    print(response, flush=True)
    assert response.status_code == 200
    assert pic_true_url in profile["pictures"]
