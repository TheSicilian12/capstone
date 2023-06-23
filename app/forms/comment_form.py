from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Cart

class CommentForm(FlaskForm):
    # currently allowing data to not be required for total_price because a 0 would be falsy.
    details = StringField(
        'comment', validators=[DataRequired()]
    )
    user_id = IntegerField(
        'user_id', validators=[DataRequired()]
    )
    product_ids = IntegerField(
        'product_ids', validators=[DataRequired()]
    )
    rating = IntegerField(
        'rating', validators=[DataRequired()]
    )
