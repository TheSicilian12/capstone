from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product_Detail(db.Model):
    __tablename__ = 'product_details'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String(1000))
    # image_main
    # image_1
    # image_2
    # image_3
    # image_4
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)


    # Relationships
    product = db.relationship("Product", back_populates="product_details")

    def to_dict(self):
        return {
            'id': self.id,
            'desc': self.desc,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
