from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String(1000))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'details': self.details,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
