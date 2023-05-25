from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
    product_id = IntegerField(
        'product_id', validators=[DataRequired()]
    )
    main_image = StringField(
        'main_image', validators=[DataRequired()]
    )
    image_url = StringField(
        'image_url', validators=[DataRequired()]
    )
