from flask import Blueprint, request
from app.models import Product, db, User, Image
from flask_login import login_required, current_user
from app.forms import ImageForm

image_routes = Blueprint("image", __name__)

# Add images
# Adjusting front end to send a list of dictionaries for mass uploading.
@image_routes.route('/create', methods=["POST"])
@login_required
def post_images():
    """
    Post images associated to a product
    """
    print("-------------------------------Post image------------------------------------")
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("-------------------before if")
    if form.validate_on_submit():
        print("-----------------------after form validate")
        data = form.data
        print("------------------before error validator: ", data["main_image"])

        if not data["main_image"] == "yes" and not data["main_image"] == "no":
            print("--------------error handling")
            print("---------------------main image: ", data["main_image"])
            return {"errors": "incorrect image type information"}

        print("--------------------data: ", data)
        print("----------------------product id: ", data["product_id"])
        new_image = Image(
            product_id = data["product_id"],
            main_image = data["main_image"],
            image_url = data["image_url"]
        )
        db.session.add(new_image)
        db.session.commit()
    #     return {
    #         "image": new_image.to_dict()
    #     }
    # else:
    #     return {
    #         "errors": form.errors
    #     }


# Edit an image by product id
# Authorized user: logged in and owner of product
@image_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def edit_image(id):
    """
    Edit an image by product id
    """
    print("--------------------------Edit Image-----------------------------")

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Image.query.filter(Image.product_id == id).all()
