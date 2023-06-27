from flask import Blueprint, request
from app.models import Comment, Product, db, User, Image
from flask_login import login_required, current_user
from app.forms import CommentForm

comment_routes = Blueprint("comment", __name__)

# Get all of a Product's Comments
# Any user
@comment_routes.route('/product/<int:productId>')
def get_all_prod_comments(productId):
    '''
    Query for all of the comments associated with a product
    '''
    
    all_comments = Comment.query.filter(Comment.product_id == productId).all()

    response = [comment.to_dict() for comment in all_comments]

    return {'comments': response}
