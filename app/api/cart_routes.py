from flask import Blueprint, request
from app.models import Cart, Cart_Item, Product, db, User
from flask_login import login_required, current_user
# from app.forms import ProductForm

cart_routes = Blueprint("cart", __name__)

# Get all carts
# just for testing
@cart_routes.route('')
@login_required
def get_all_carts():
    """
    Query for all carts
    """
    all_carts = Cart.query.all()
    response = [cart.to_dict() for cart in all_carts]
    return {'carts': response}


# Get all items by cart id
@cart_routes.route('/<int:id>')
@login_required
def get_single_carts(id):
    """
    Query for items by cart id
    """
    print("------------------------------------GET ALL ITEMS BY CART ID------------------------------------------------")
    cart_items = Cart_Item.query.filter(Cart_Item.cart_id == id).all()
    # print("--------------------------------------", cart_items)
    response = [item.to_dict() for item in cart_items]
    # response = [print(item["productId"]) for item in responseItems]

    for item in response:
        product = Product.query.get(item["productId"])
        print(product.to_dict())
        item["product"] = product.to_dict()

    # print("response: ", response)
    return {'items': response}
