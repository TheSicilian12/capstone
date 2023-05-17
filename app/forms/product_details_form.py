from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, validationError
from app.models import Product_Detail

class ProductDetailsForm(FlaskForm):
    desc = StringField(
        'description', validators=[DataRequired()]
    )
