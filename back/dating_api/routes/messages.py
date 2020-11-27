import os
from flask import Blueprint, session, request

from .. import socketio
from ..models.message import Message
from ..models.user import User
from ..utils import error, success
from ..utils.decorators import user_required, payload_required, jsonify_output, catcher

messages = Blueprint("messages", __name__)

@messages.route("/conversations", methods=["GET"])
@jsonify_output
@user_required
def get_conversations(user):
    return user.conversations_json

@messages.route("/messages", methods=["POST"])
@jsonify_output
@payload_required
@user_required
@catcher
def get_messages(user, payload):
    messages = Message.list(user.id, payload["user"])
    unread = sum(1 if m.unread else 0 for m in messages)
    res = {'messages': [m.dict for m in messages], "unread": unread}
    Message.read_messages_with(user.id, payload["user"])
    return res

@messages.route("/new_message", methods=["POST"])
@jsonify_output
@payload_required
@user_required
@catcher
def send_message(user, payload):
    if payload["content"] is "":
        return error("Message vide", 400)
    dest = User.get_user(user_id=payload["user"])
    if dest is None or not user.matches_with(dest):
        return error("Tu n'as pas matché avec cet utilisateur", 403)
    msg = Message(user.id, payload["user"], payload["content"])
    return success({"message": msg.dict}, 201)
