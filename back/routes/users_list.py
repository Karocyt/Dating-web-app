from flask import Blueprint, request

from ..utils.decorators import (jsonify_output, validated_required, payload_required, catcher)

users_list = Blueprint("users_list", __name__)

@users_list.route("/users", methods=["GET"])
@jsonify_output
@validated_required
def get_users(user):
    """
    List unmatched users
    """
    users = [x for x in user.list_users()]
    return {"users": users}

@users_list.route("/users", methods=["POST"])
@jsonify_output
@payload_required
@validated_required
@catcher
def search_users(user, payload):
    """
    Search in users
    """
    users = [x for x in user.list_users(full=True)]


    
    return {"users": users}

@users_list.route("/matches", methods=["GET"])
@jsonify_output
@validated_required
def get_matches(user):
    """
    List matches as an array of full json encoded profiles
    """
    return {"users": [x for x in user.matchlist]}

@users_list.route("/liked_by", methods=["GET"])
@jsonify_output
@validated_required
def get_liked_by(user):
    """
    List people liking you as an array of full json encoded profiles
    """
    return {"users": [x for x in user.liked_by_list]}

@users_list.route("/visits", methods=["GET"])
@jsonify_output
@validated_required
def get_visits(user):
    """
    List visits as an array of full json encoded profiles
    """
    return {"users": [x for x in user.visits_list]}
