from flask import Blueprint, request
from app.models import Product, Product_Detail, Product_Inventory, db, User
from flask_login import login_required, current_user
from app.forms import ProductDetailsForm, ProductForm

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
    # print('--------------------------All Products--------------------------------')
    # print('response: ', response)
    # print('all_products: ', all_products)
    return {'products': response}

# A Product by id
# Any user
@product_routes.route('/<int:id>')
def get_single_product(id):
    """
    Query to get a signle product by id
    """
    # print('-----------------------------Single Product--------------------------------')
    single_product = Product.query.get(id)
    # print('-------single_product------ ', single_product.to_dict())
    return {'product': single_product.to_dict()}

# Delete a Product
# Authorized user: logged in and owner of product
@product_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_product(id):
    """
    Delete a product by id
    """
    product = Product.query.get(id)
    if current_user.id != product.ownerId:
        return {"errors": "This is not an authorized route."}
    else:
        db.session.delete(product)
        db.session.commit()
        return "Product deleted"
