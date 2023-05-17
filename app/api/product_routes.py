from flask import Blueprint, request
from app.models import Product, Product_Detail, Product_Inventory, db, User
from flask_login import login_required, current_user
# forms import

product_routes = Blueprint("product", __name__)

# All Products
# Any user
@product_routes.route('')
def get_all_products():
    """
    Query for all products and returns them in a list of dictionaries
    """
    # May need to update to include the data associated with the foreign keys
    all_products = Product.query.all()
    response = [product.to_dict() for product in all_products]
    return {'products': response}
