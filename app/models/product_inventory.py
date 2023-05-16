from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product_Inventory(db.Model):
    __tablename__ = 'product_inventories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    inventory = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'desc': self.desc,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
