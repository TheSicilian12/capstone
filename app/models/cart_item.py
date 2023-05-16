from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
