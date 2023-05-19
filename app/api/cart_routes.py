from flask import Blueprint, request
from app.models import Cart, Cart_Item, db, User
from flask_login import login_required, current_user
# from app.forms import ProductForm

cart_routes = Blueprint("cart", __name__)

# Get all carts
# just for testing
@cart_routes.route('')
def get_all_carts():
    """
    Query for all carts
    """
    all_carts = Cart.query.all()
    response = [cart.to_dict() for cart in all_carts]
    return {'carts': response}


# Get all items by cart id
# @cart_routes.route('/<int:id>')
# def get_all_carts(id):
#     """
#     Query for items by cart id
#     """
#     cart_items = Cart_Item.query.filter(Cart_Item.cart_id == 1).all
#     responsetest = [item.to_dict() for item in cart_items]
#     return {'items': responsetest}
