from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_invenotries():
    inventory1 = Product(
        inventory=100)
    inventory2 = Product(
        inventory=0)
    inventory3 = Product(
        inventory=1000)
    inventory4 = Product(
        inventory=50)
    inventory5 = Product(
        inventory=48)
    inventory6 = Product(
        inventory=5)
    inventory7 = Product(
        inventory=11)
    inventory8 = Product(
        inventory=50000)
    inventory9 = Product(
        inventory=30)
    inventory10 = Product(
        inventory=80)

    db.session.add(inventory1)
    db.session.add(inventory2)
    db.session.add(inventory3)
    db.session.add(inventory4)
    db.session.add(inventory5)
    db.session.add(inventory6)
    db.session.add(inventory7)
    db.session.add(inventory8)
    db.session.add(inventory9)
    db.session.add(inventory10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_invenotries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_invenotries"))

    db.session.commit()
