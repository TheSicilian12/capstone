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
