from flask import Blueprint, request
from app.models import Product, Product_Detail, db, User
from flask_login import login_required, current_user
from app.forms import ProductDetailsForm, ProductForm

product_routes = Blueprint("product", __name__)

# Get all Products
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


# Get a Product by id
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


# Add a Product
# Authorized user: logged in
@product_routes.route('/create', methods=['POST'])
@login_required
def create_product():
    """
    Create a product
    """
    print('-----------------------------Add Product--------------------------------')
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_product = Product(
            SKU = data['SKU'],
            name = data['name'],
            price = data['price'],
            inventory = data['inventory']
        )
        db.session.add(new_product)
        db.session.commit()
        # print('--------------------------------------------new_product: ')
        print('-------------------------------before success return--------------------------')
        return {
            "product": new_product.to_dict()
        }
    else:
        print('----------------------------after success return--------------------------------')
        return {
            "errors": form.errors
        }


# Add Product Details
# Authorized user: logged in
@product_routes.route('/create-details', methods=['POST'])
@login_required
def create_product_details():
    # print('-----------------------------Add Product Details--------------------------------')
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print("-----------within form validate------------")
        data = form.data
        new_product_details = Product_Detail(
            desc = data['desc'],
        )
        db.session.add(new_product_details)
        db.session.commit()
        # print("-----------------------------befure success return-----------------------------")
        return {
            "product": new_product_details.to_dict()
        }
    # print("------------------------------------before error return-----------------------------------")
    return {
        "errors": form.errors
    }


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
