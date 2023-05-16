from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'total_price': self.total_price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
