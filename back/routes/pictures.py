import os
from flask import Blueprint, send_from_directory
from werkzeug.utils import secure_filename

from ..models.tag import Tag
from ..utils.decorators import user_required, payload_required, jsonify_output
from ..utils.misc import success, error

private_pictures = Blueprint("private_pictures", __name__)

@private_pictures.route("/pictures/<path:filename>", methods=["GET"])
@user_required
def get_picture(filename, user):
    """
    Returns a user picture to logged in users
    """
    return send_from_directory(
        os.path.join(private_pictures.instance_path, 'pictures'),
        os.path.join('/data', filename)
    )

@private_pictures.route("/new_picture", methods=["POST"])
@payload_required
@user_required
@jsonify_output
def new_picture(filename, payload, user):
    """
    Add a picture and returns pictures_list on success
    """
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ('bmp', 'png', 'jpg', 'jpeg')
    
    if 'file' not in request.files:
        return error("Pas de fichier joint", 403)
    if len(user.pictures) == 5: ######## HARDCODED LIMIT !!! #########
        return error("Vous avez déjà 5 photos", 409)
    pic = request.files['file']
    if pic.filename == '':
        return error("Pas de fichier joint", 403)
    if not allowed_file(pic.filename):
        return error(f"Fichier {pic.filename} invalide", 400)
    filename = secure_filename(pic.filename)
    new_name = f"{user.id}_{filename}"
    pic.save(os.path.join(os.path("/data"), new_name))
    return {'new_picture': f"{url}/pictures/{new_name}"}

@private_pictures.route("/swap_pictures", methods=["POST"])
@payload_required
@user_required
def swap_pictures(payload, user):
    """
    Swap pictures order in pictures list, returns pictures list on success
    """
    return success(user.pictures)

@private_pictures.route("/pictures/<path:filename>", methods=["DELETE"])
@user_required
def del_picture(filename, user):
    """
    Returns a user picture to logged in users
    """
    return send_from_directory(
        os.path.join(private_pictures.instance_path, 'pictures'),
        os.path.join('/data', filename)
    )
