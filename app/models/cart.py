import json
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Integer)
    product_ids = db.Column(db.PickleType())
    quantity_dict = db.Column(db.PickleType())
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)


    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    def to_dict(self):
        return {
            'id': self.id,
            'totalPrice': self.total_price,
            'userId': self.user_id,
            'productIds': self.product_ids,
            'quantityDict' : self.quantity_dict,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
