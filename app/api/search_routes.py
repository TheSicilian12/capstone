from flask import Blueprint, request
from app.models import Product, db, User, Image, Comment
from flask_login import login_required, current_user

search_routes = Blueprint("search", __name__)

# Search for products
# Any user
@search_routes.route('/<string:search_data>')
def search_products(search_data):
    """
    Query to get a products associated with search
    """
    print("---------------------------Search for products---------------------------")
