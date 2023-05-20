from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Cart

class CartForm(FlaskForm):
    total_price = IntegerField(
        'total_price', validators=[DataRequired()]
    )
    user_id = IntegerField(
        'user_id', validators=[DataRequired()]
    )
