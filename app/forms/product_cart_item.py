from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Cart_Item

class CartItemForm(FlaskForm):
    cart_id = IntegerField(
        'cart_id', validators=[DataRequired()]
    )
    product_id = IntegerField(
        'product_id', validators=[DataRequired()]
    )
