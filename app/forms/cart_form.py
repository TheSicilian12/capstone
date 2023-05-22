from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Cart

class CartForm(FlaskForm):
    # currently allowing data to not be required for total_price because a 0 would be falsy.
    total_price = IntegerField(
        'total_price'
    )
    user_id = IntegerField(
        'user_id', validators=[DataRequired()]
    )
    product_ids = IntegerField(
        'product_ids'
    )
