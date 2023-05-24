from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    SKU = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    inventory = db.Column(db.Integer)
    desc = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    # Foreign Keys
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Relationships
    images = db.relationship("Image", back_populates="product", cascade="all, delete-orphan")


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
