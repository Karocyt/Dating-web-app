#import mariadb
from flask import jsonify
from datetime import datetime

from .. import db

class Message():
    
    def __init__(self, from_id, to_id, content, date=None):
        self.from_id, self.to_id, self.content, self.date = from_id, to_id, content, date
        if not self.date:
            query = """
                INSERT INTO messages SET from_id=?, to_id=?, content=?
                """
            db.exec(query, (from_id, to_id, content,))
            query = """
                SELECT date from messages WHERE from_id=? AND to_id=? ORDER BY date DESC
                """
            values = db.fetch(query, (from_id, to_id,))
            self.date = values[0][0]
        if type(self.date) is str:
            self.date = datetime.strptime(self.date, "%a, %d %b %Y %H:%M:%S GMT")

    @staticmethod
    def list(user_id_1, user_id_2):
        query = """
            SELECT
                from_id, to_id, content, date
            FROM messages
            WHERE
                (from_id=? AND to_id=?)
                OR (from_id=? AND to_id=?)
            ORDER BY
<<<<<<< HEAD
                date DESC
=======
                date ASC
>>>>>>> 4fa060d3d576dff27a7e7b1eb5d32f9c9e21048a
            """
        values = db.fetch(query, (user_id_1, user_id_2, user_id_2, user_id_1,))
        return [Message(*row) for row in values]

    @property
    def dict(self):
        return {
            'from': self.from_id,
            'to': self.to_id,
            'date': self.date,
            'content': self.content
        }
