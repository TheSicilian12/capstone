from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # main_image = db.Column(db.Boolean, nullable=False)
    main_image = db.Column(db.String(5))
    image_url = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    # Foreign Keys
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    # Relationships
    product = db.relationship("Product", back_populates="images")


    def to_dict(self):
        return {
            'id': self.id,
            'main_image': self.main_image,
            'image_url': self.image_url,
            'product_id': self.product_id
        }
