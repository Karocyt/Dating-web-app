#import mariadb
from flask import jsonify

from .. import db
from ..utils import Validator

class Tag():
    
    def __init__(self, name):
        self.name = name
        query = """
            INSERT INTO `tags` SET name=? ON DUPLICATE KEY UPDATE id=id
            """
        db.exec(query, (Validator.tag(name),))
        self.id = db.cur.lastrowid
