import os
from flask import Blueprint, session, request

from .. import socketio
from ..models.message import Message
from ..models.user import User
from ..utils import error, success
from ..utils.decorators import user_required, payload_required, jsonify_output, catcher

notifications = Blueprint("notifications", __name__)

@notifications.route("/notifications", methods=["GET"])
@jsonify_output
@user_required
def get_notifications(user):
    return user.notifications_json
