from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
