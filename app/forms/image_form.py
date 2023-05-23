from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
    # currently allowing data to not be required for total_price because a 0 would be falsy.
    product_id = IntegerField(
        'product_id', validators=[DataRequired()]
    )
    main_image = BooleanField(
        'main_image', validators=[DataRequired()]
    )
    image_url = StringField(
        'image_url', validators=[DataRequired()]
    )
