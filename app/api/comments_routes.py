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

    # Add user info to comments
    for comment in response:
        user = User.query.filter(User.id == comment["userId"]).first()
        print("-----------------------user: ", user)
        comment["user"] = user.to_dict()

    return {'comments': response}

@comment_routes.route('/product/<int:productId>/new', methods=['POST'])
@login_required
def create_prod_comments(productId):
    """
    Create a comment for a product
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print("---------form validate: ", form.validate_on_submit())
    # print("---------details: ", form.data["details"])
    # print("---------rating: ", form.data["rating"])
    # print("---------user_id: ", form.data["user_id"])
    # print("---------product_id: ", form.data["product_ids"])
    # print("---------form data: ", form.data)
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            details = data["details"],
            rating = data['rating'],
            user_id = data['user_id'],
            product_id = data['product_ids']
        )
        db.session.add(new_comment)
        db.session.commit()
        return {
            "comment": new_comment.to_dict()
        }
    else:
        return {
            "errors": form.errors
        }

# @comment_routes.route('/<int:commentId>/edit', methods=['PUT'])
# @login_required
# def create_prod_comments(commentId):
#     """
#     Create a comment for a product
#     """
#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         comment = Comment.query.get(commentId)

#         comment.details = form.data["details"]
#         comment.rating = form.data["rating"]
#         db.session.commit()
#         return {
#             "comment": comment.to_dict()
#         }
#     else:
#         return {
#             "errors": form.errors
#         }
