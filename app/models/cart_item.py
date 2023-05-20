from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    # Foreign Keys
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    # Relationships
    cart = db.relationship("Cart", back_populates="cart_items")


    def to_dict(self):
        return {
            'id': self.id,
            'cartId': self.cart_id,
            'productId': self.product_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
