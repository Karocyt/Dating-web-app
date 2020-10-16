from flask import Blueprint, request

from ..utils.decorators import (jsonify_output, validated_required)

users_list = Blueprint("users_list", __name__)

@users_list.route("/users", methods=["GET"])
@jsonify_output
@validated_required
def get_users(user):
    """
    List unmatched users
    """
    payload = request.get_json()
    return {"users": user.list_users()}

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

@users_list.route("/liked", methods=["GET"])
@jsonify_output
@validated_required
def get_likes(user):
    """
    List people you liked as an array of full json encoded profiles
    """
    return {"users": [x for x in user.liked_list]}

@users_list.route("/visits", methods=["GET"])
@jsonify_output
@validated_required
def get_visits(user):
    """
    List visits as an array of full json encoded profiles
    """
    return {"users": [x for x in user.visits_list]}


@users_list.route("/search", methods=["GET"])
@jsonify_output
@validated_required
@payload_required
def search_users(user):
    """
    List visits as an array of full json encoded profiles
    """
    return {"users": [x for x in user.visits_list]}
