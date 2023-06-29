from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
      product_id=1,
      main_image="yes",
      image_url="https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg"
      )
    image1sub1 = Image(
      product_id=1,
      main_image="no",
      image_url="https://upload.wikimedia.org/wikipedia/commons/a/a5/6sided_dice.jpg"
      )
    image1sub2 = Image(
      product_id=1,
      main_image="no",
      image_url="https://upload.wikimedia.org/wikipedia/commons/a/a5/6sided_dice.jpg"
      )
    image1sub3 = Image(
      product_id=1,
      main_image="no",
      image_url="https://upload.wikimedia.org/wikipedia/commons/a/a5/6sided_dice.jpg"
      )
    image2 = Image(
      product_id=2,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image3 = Image(
      product_id=3,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image3sub1 = Image(
      product_id=3,
      main_image="no",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image3sub2 = Image(
      product_id=3,
      main_image="no",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image4 = Image(
      product_id=4,
      main_image="yes",
      image_url="https://m.media-amazon.com/images/I/71U4JU+izYL._AC_UF894,1000_QL80_.jpg"
      )
    image4sub1 = Image(
      product_id=4,
      main_image="no",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image4sub2 = Image(
      product_id=4,
      main_image="no",
      image_url="https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg"
      )
    image5 = Image(
      product_id=5,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image6 = Image(
      product_id=6,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image7 = Image(
      product_id=7,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image8 = Image(
      product_id=8,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image9 = Image(
      product_id=9,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )
    image10 = Image(
      product_id=10,
      main_image="yes",
      image_url="https://bayphoto.com/images/presentation/wood-boxes/box-with-photo-print.jpg"
      )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image1sub1)
    db.session.add(image1sub2)
    db.session.add(image1sub3)
    db.session.add(image3sub1)
    db.session.add(image3sub2)
    db.session.add(image4sub1)
    db.session.add(image4sub2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
