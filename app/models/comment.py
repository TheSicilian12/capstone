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

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    # Relationships
    user = db.relationship("User", back_populates="comments")
    product = db.relationship("Product", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'details': self.details,
            'rating': self.rating,
            'userId': self.user_id,
            'productId': self.product_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
