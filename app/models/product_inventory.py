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
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    # Relationships
    product = db.relationship("Product", back_populates="product_inventory")


    def to_dict(self):
        return {
            'id': self.id,
            'inventory': self.inventory,
            # 'product': self.product,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
