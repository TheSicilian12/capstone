from flask import Blueprint, request
from app.models import Product, db, User, Image
from flask_login import login_required, current_user
from app.forms import ImageForm

image_routes = Blueprint("image", __name__)

# Add a images
@image_routes.route('/create', methods=["POST"])
@login_required
def post_images():
    """
    Post images associated to a product
    """
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_image = Image(
            product_id = data["product_id"],
            main_image = data["main_image"],
            image_url = data["image_url"]
        )
        db.session.add(new_image)
        db.session.commit()
        return {
            "image": new_image.to_dict()
        }
    else:
        return {
            "errors": form.errors
        }
