from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
    SKU = StringField(
        'SKU', validators=[DataRequired()]
    )
    name = StringField(
        'name', validators=[DataRequired()]
    )
    price = IntegerField(
        'price', validators=[DataRequired()]
    )
