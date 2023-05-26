from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
    # SKU = StringField(
    #     'SKU', validators=[DataRequired()]
    # )
    name = StringField(
        'name', validators=[DataRequired()]
    )
    # Change to floatfield
    price = FloatField(
        'price', validators=[DataRequired()]
    )
    inventory = IntegerField(
        'inventory', validators=[DataRequired()]
    )
    desc = StringField(
        'desc', validators=[DataRequired()]
    )
    owner_id = IntegerField(
        'owner_id', validators=[DataRequired()]
    )
