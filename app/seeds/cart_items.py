from app.models import db, Cart_Item, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cart_items():
    cart_item1 = Cart_Item(
        cart_id=1, product_id=1)
    cart_item2 = Cart_Item(
        cart_id=1, product_id=2)
    cart_item3 = Cart_Item(
        cart_id=1, product_id=2)
    cart_item4 = Cart_Item(
        cart_id=1, product_id=3)
    cart_item5 = Cart_Item(
        cart_id=2, product_id=1)
    cart_item6 = Cart_Item(
        cart_id=2, product_id=2)
    cart_item7 = Cart_Item(
        cart_id=2, product_id=3)
    cart_item8 = Cart_Item(
        cart_id=2, product_id=4)
    cart_item9 = Cart_Item(
        cart_id=2, product_id=5)
    cart_item10 = Cart_Item(
        cart_id=2, product_id=5)

    db.session.add(cart_item1)
    db.session.add(cart_item2)
    db.session.add(cart_item3)
    db.session.add(cart_item4)
    db.session.add(cart_item5)
    db.session.add(cart_item6)
    db.session.add(cart_item7)
    db.session.add(cart_item8)
    db.session.add(cart_item9)
    db.session.add(cart_item10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
