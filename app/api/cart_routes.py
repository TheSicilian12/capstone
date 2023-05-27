from flask import Blueprint, request
from app.models import Cart, Product, db, User, Image
from flask_login import login_required, current_user
from app.forms import CartForm

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
@cart_routes.route('/yours')
# @login_required
def get_single_cart():
    """
    Query for single cart
    """
    print("--------------------------Get Single Cart--------------------------------")
    # single_cart = Cart.query.filter(Cart.user_id == user_id).all()
    # print("-----------user_id", user_id)

    print("--------------current user: ", current_user.id)
    single_cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    print("--------------response: ", single_cart)

    if not single_cart:
        return {"errors": "No cart"}

    response = single_cart.to_dict()
    # response = [cart.to_dict() for cart in single_cart]

    productKey = 0
    response["items"] = {}
    for item in single_cart.to_dict()['productIds']:
        print("item: ", item)
        mainImage = Image.query.filter(Image.product_id == item, Image.main_image == "yes").all()[0]
        item = Product.query.get(item)
        # response["product"] = item.to_dict()
        print("-------------------mainImage: ", mainImage)

        response["items"].update({productKey: {"item": item.to_dict(), "mainImage": mainImage.to_dict()}})
        productKey += 1
        # print("--------------------item: ", item.to_dict()["id"])

    del response["productIds"]
    # print("------------------------response: ", response)
    return {'carts': response}


# Get all items by cart id
# @cart_routes.route('/<int:id>/items')
# @login_required
# def get_items_single_cart(id):
#     """
#     Query for items by cart id
#     """
#     print("------------------------------------GET ALL ITEMS BY CART ID------------------------------------------------")
#     cart_items = Cart_Item.query.filter(Cart_Item.cart_id == id).all()
#     # print("--------------------------------------", cart_items)
#     response = [item.to_dict() for item in cart_items]
#     # response = [print(item["productId"]) for item in responseItems]

#     for item in response:
#         product = Product.query.get(item["productId"])
#         print("------------------product: ", product)
#         # print(product.to_dict())
#         if product:
#             item["product"] = product.to_dict()

#     print("response: ", response)
#     return {'items': response}


# Add an item to a cart by id
@cart_routes.route('/add-item', methods=["PUT"])
@login_required
def update_item_carts():
    """
    Add a single item to a cart
    """
    print("-------------------------Add item to cart by id----------------------------------")

    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    # print("-------------------------------------------------")
    # print("------------------initial cart: ", cart.to_dict())
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("-------------------------------------------------")
    # print("------------------form: ", form.data)

    if form.validate_on_submit():
        # print("-----------------if statement")

        # print("----------------cart items: ", cart.to_dict()["productIds"])

        productList = []
        if cart.to_dict()["productIds"]:
            productList = [productId for productId in cart.to_dict()["productIds"]]

        productList.append(form.data["product_ids"])
        print("-------------productList: ", productList)
        cart.product_ids = productList
        # print("-------------------after append: ", cart.to_dict()["productIds"])
        db.session.commit()
        # print("-----------------cart: ", cart.to_dict())
        return cart.to_dict()
    else:
        return {
            "errors": "error"
        }


# Add a cart
@cart_routes.route('/add-cart', methods=["POST"])
@login_required
def post_carts():
    """
    Post a cart
    """
    print("-------------------------Add cart----------------------------------")
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    checkCartExists = Cart.query.filter(Cart.user_id == current_user.id).all()
    print("-----------------------------", len(checkCartExists))
    if len(checkCartExists) != 0:
        return {
            "errors": "Cart already exists"
        }


    print("---------------------------------", form.data)
    print("---------------------------------", form.validate_on_submit())
    # print("---------------------", form.validate_on_submit())
    if form.validate_on_submit():
        # print("------------------------------------if statement")
        data = form.data
        new_cart = Cart(
            total_price = data['total_price'],
            user_id = data['user_id']
        )
        db.session.add(new_cart)
        db.session.commit()
        print("---------------------------new cart: ", new_cart.to_dict())
        return {
            "cart": new_cart.to_dict()
        }
    else:
        # print("------------------------before errors--------------------------")
        return {
            "errors": form.errors
        }


# Delete a cart by user id
@cart_routes.route('/delete', methods=["DELETE"])
@login_required
def delete_cart():
    """
    Delete a cart
    """
    print("-------------------------------Delete a cart by user id")
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    # print("----------------user_id: ", current_user.id)

    # print("--------------------cart: ", cart.to_dict())

    if current_user.id != cart.user_id:

        return {"errors": "error"}

    print("-----------------------------", cart)

    db.session.delete(cart)
    db.session.commit()
    return {"cart": "deleted"}


# Delete an item from a cart by id
@cart_routes.route('/<int:product_id>/item', methods=["DELETE"])
@login_required
def delete_item_carts(product_id):
    """
    Delete an item from a cart by id
    """
    print("-------------------------Delete item from a cart-------------------------")
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    productList = [productId for productId in cart.to_dict()["productIds"]]

    productList.remove(product_id)

    cart.product_ids = productList

    db.session.commit()

    return {"item": "deleted"}

# Delete all items by id from all carts
@cart_routes.route('/<int:product_id>/spec-items', methods=["DELETE"])
@login_required
def delete_spec_items_carts(product_id):
    """
    Delete all items of a specifc id from a cart
    """
    print("-------------------------Delete specific items from all carts-------------------------")
    print("------------------------------------product id: ", product_id)

    all_carts = Cart.query.all()
    # all_carts_to_dict = [cart.to_dict() for cart in all_carts]
    print("---------------------------------------------all carts: ", all_carts)

    for cart in all_carts:
        print("---------------------------------------------cart: ", cart.to_dict())
        productList = []
        if cart.to_dict()["productIds"] and int(product_id) in cart.to_dict()["productIds"]:
            newList = [prodId for prodId in cart.to_dict()["productIds"] if prodId != product_id]
            print("-------------------------------new list: ", newList)
            updateCart = Cart.query.get(cart.to_dict()["id"])
            updateCart.product_ids = newList
            print("---------------------------------cart with newList: ", cart.to_dict())
            db.session.commit()
            print("-------------------------------------------------------------")


    return {"items": "deleted"}
