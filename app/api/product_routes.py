from flask import Blueprint, request
from app.models import Product, Product_Detail, Product_Inventory, db, User
from flask_login import login_required, current_user
# forms import

product_routes = Blueprint("product", __name__)

# All Products
# Any user
# @product_routes.route('')
