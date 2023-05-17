from app.models import db, Product_Inventory, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_inventories():
    inventory1 = Product_Inventory(
        inventory=100, product_id=1)
    inventory2 = Product_Inventory(
        inventory=0, product_id=2)
    inventory3 = Product_Inventory(
        inventory=1000, product_id=3)
    inventory4 = Product_Inventory(
        inventory=50, product_id=4)
    inventory5 = Product_Inventory(
        inventory=48, product_id=5)
    inventory6 = Product_Inventory(
        inventory=5, product_id=6)
    inventory7 = Product_Inventory(
        inventory=11, product_id=7)
    inventory8 = Product_Inventory(
        inventory=50000, product_id=8)
    inventory9 = Product_Inventory(
        inventory=30, product_id=9)
    inventory10 = Product_Inventory(
        inventory=80, product_id=10)

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
def undo_product_inventories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_inventories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_inventories"))

    db.session.commit()
