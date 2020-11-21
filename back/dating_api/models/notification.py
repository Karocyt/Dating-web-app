from flask import jsonify
from datetime import datetime

from .. import db

class Notification():
    
    def __init__(self, user_id, from_id, notification_type, unread_status=1, date=None):
        self.from_id, self.user_id, self.type, self.date = from_id, user_id, notification_type, date
        self.unread = True if unread_status == 1 else False
        if not self.date:
            query = """
                INSERT INTO notifications SET from_id=?, user_id=?, type=?
                """
            db.exec(query, (from_id, user_id, notification_type,))
            query = """
                SELECT date from notifications WHERE user_id=? AND from_id=? ORDER BY date DESC
                """
            values = db.fetch(query, (user_id, from_id,))
            self.date = values[0][0]
        if type(self.date) is str:
            self.date = datetime.strptime(self.date, "%a, %d %b %Y %H:%M:%S GMT")

    @staticmethod
    def list(user_id_1):
        query = """
            SELECT
                from_id, to_id, type, unread, date
            FROM notifications
            WHERE
                user_id=?
            ORDER BY
                date DESC
            LIMIT 10
            """
        values = db.fetch(query, (user_id_1,))
        return [Notification(*row) for row in values]

    @property
    def dict(self):
        return {
            'from': self.from_id,
            'date': self.date,
            'type': self.content,
            'unread': self.unread,
        }
