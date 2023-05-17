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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    # Foreign Keys
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))
    # product_details_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("product_details.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # product_inventory_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("product_inventories.id")))

    # Relationships
    product_details = db.relationship("Product_Detail", back_populates="product", cascade="all")
    product_inventory = db.relationship("Product_Inventory", back_populates="product", cascade="all")


    def to_dict(self):
        return {
            'id': self.id,
            'SKU': self.SKU,
            'name': self.name,
            'price': self.price,
            'categoryId': self.category_id,
            'productDetailsId': self.product_details_id,
            'ownerId': self.user_id,
            'productInventoryId': self.product_inventory_id,
            # 'productDetails': self.product_details.to_dict(),
            # 'productInventory': self.product_inventory.to_dict()
        }
