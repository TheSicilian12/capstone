from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    main_image = db.Column(db.Boolean, nullable=False)


    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    # Foreign Keys
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    # Relationships

    def to_dict(self):
        return {
            'id': self.id,
            'SKU': self.SKU,
            'name': self.name,
            'price': self.price,
            # 'categoryId': self.category_id,
            'desc': self.desc,
            'ownerId': self.owner_id,
            'inventory': self.inventory,
        }
