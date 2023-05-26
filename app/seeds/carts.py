from app.models import db, Cart, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_carts():
    cart1 = Cart(
        user_id=2,
        product_ids=[1, 2, 2, 3],
        quantity_dict={1: 1, 2: 2, 3:1},
        total_price=350)
    cart2 = Cart(
        user_id=3,
        product_ids=[1, 2, 3, 4, 5, 5],
        quantity_dict={1: 1, 2: 1, 3: 1, 4: 1, 5: 2},
        total_price=360)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
