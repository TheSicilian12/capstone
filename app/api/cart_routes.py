from flask import Blueprint, request
from app.models import Cart, Cart_Item, Product, db, User
from flask_login import login_required, current_user
from app.forms import CartItemForm

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


# Get single cart
@cart_routes.route('/<int:user_id>')
# @login_required
def get_single_cart(user_id):
    """
    Query for single cart
    """
    print("--------------------------Get Single Cart--------------------------------")
    single_cart = Cart.query.filter(Cart.user_id == user_id).all()
    response = [cart.to_dict() for cart in single_cart]
    print("------------------------response: ", response[0])
    return {'carts': response[0]}


# Get all items by cart id
@cart_routes.route('/<int:id>/items')
@login_required
def get_items_single_cart(id):
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
        print("------------------product: ", product)
        # print(product.to_dict())
        if product:
            item["product"] = product.to_dict()

    print("response: ", response)
    return {'items': response}


# Add an item to a cart by id
@cart_routes.route('/add', methods=["POST"])
@login_required
def post_item_carts():
    """
    Post a single item to a cart
    """
    print("-------------------------Add item to cart by id----------------------------------")
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_item = Cart_Item(
            cart_id = data['cart_id'],
            product_id = data['product_id']
        )
        db.session.add(new_item)
        db.session.commit()
        return {
            "item": new_item.to_dict()
        }
    else:
        return {
            "errors": form.errors
        }


# Delete an item from a cart by id
@cart_routes.route('/<int:item_id>', methods=["DELETE"])
@login_required
def delete_item_carts(item_id):
    """
    Delete an item from a cart by id
    """
    item = Product.query.get(item_id)
    db.session.delete(item)
    db.session.commit()
    return "Product deleted"
