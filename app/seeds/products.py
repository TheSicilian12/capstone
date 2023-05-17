from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        SKU='a001', name='The super cool product', price=100, user_id=1, product_inventory_id=1, product_details_id=1)
    product2 = Product(
        SKU='a002', name='A product for making other products more cool', user_id=2, price=50, product_inventory_id=3,  product_details_id=2)
    product3 = Product(
        SKU='a003', name='Not really sure, just found this in my backyard', user_id=3, price=150, product_inventory_id=5,  product_details_id=3)
    product4 = Product(
        SKU='a004', name='This product is gonna change your whole life, for sure', user_id=2, price=40, product_inventory_id=7,  product_details_id=4)
    product5 = Product(
        SKU='a005', name='Buy this', price=10, user_id=3, product_inventory_id=9, product_details_id=5)
    product6 = Product(
        SKU='a006', name='Book!', price=80, user_id=2, product_inventory_id=2, product_details_id=6)
    product7 = Product(
        SKU='a007', name='Movie!', price=75, user_id=3, product_inventory_id=4, product_details_id=7)
    product8 = Product(
        SKU='a008', name='Katana', price=1, user_id=2, product_inventory_id=6, product_details_id=8)
    product9 = Product(
        SKU='a009', name='Mecha suit', price=155, user_id=3, product_inventory_id=8, product_details_id=9)
    product10 = Product(
        SKU='a010', name='Another product', price=100, user_id=2, product_inventory_id=10, product_details_id=10)

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
