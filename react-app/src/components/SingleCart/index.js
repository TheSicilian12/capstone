import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleCart.css'
import '../UniversalCSS.css'
import { deleteItemCartTHUNK, getSingleCartTHUNK } from '../../store/cart';
import DeleteItemCart from '../DeleteItemCart';

export default function SingleCart() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart)

    // const cartId = Number(useParams().cartId)

    const singleCart = cart.carts
    // const totalPrice = cart.totalPrice

    useEffect(() => {
        dispatch(getSingleCartTHUNK())
    }, [dispatch])

    if (!singleCart) return <div>loading single cart</div>
    console.log('singleCart frontend: ', singleCart.items)

    return (
        <div className="border-black shopping-cart-page-container">
            <div className="shopping-cart-container">
                Shopping Cart
                {/* {Object.values(singleCart.items).map(item => {
                    return (
                        <div className="border-black shopping-cart-product-container">
                            <div className="">
                                <p className="shopping-cart-bold">{item.name}</p>
                                <ul>stock: {item.inventory}</ul>
                                {item.inventory > 5 && <p>In Stock</p>}
                                {item.inventory === 5 && <p>Only 5 left in stock</p>}
                                {item.inventory === 4 && <p>Only 4 left in stock</p>}
                                {item.inventory === 3 && <p>Only 3 left in stock</p>}
                                {item.inventory === 2 && <p>Only 2 left in stock</p>}
                                {item.inventory === 1 && <p>Only 1 left in stock</p>}
                                {item.inventory === 0 && <p>Out of stock</p>}
                                <DeleteItemCart itemId={item.id} />
                            </div>
                            <p className="shopping-cart-bold">${item.price}</p>
                        </div>
                    )
                })} */}
                {Object.keys(singleCart.quantityDict).map(qKey => {
                    let items = Object.values(singleCart.items)
                    // console.log("item obj: ", items)
                    // console.log("qKey: ", qKey)
                    // console.log("qKey type: ", typeof qKey)
                    let item = items.find(item => item.id === Number(qKey))
                    // console.log("cart item: ", item)
                    return (
                        <div className="border-black shopping-cart-product-container">
                            <div className="">
                                <p className="shopping-cart-bold">{item.name}</p>
                                <p>stock: {item.inventory}</p>
                                <p>quantity: {singleCart.quantityDict[Number(qKey)]}</p>

                                {item.inventory > 5 && <p>In Stock</p>}
                                {item.inventory === 5 && <p>Only 5 left in stock</p>}
                                {item.inventory === 4 && <p>Only 4 left in stock</p>}
                                {item.inventory === 3 && <p>Only 3 left in stock</p>}
                                {item.inventory === 2 && <p>Only 2 left in stock</p>}
                                {item.inventory === 1 && <p>Only 1 left in stock</p>}
                                {item.inventory === 0 && <p>Out of stock</p>}
                                <DeleteItemCart itemId={item.id} />
                            </div>
                            <p className="shopping-cart-bold">${item.price}</p>
                        </div>
                    )
                })}
            </div>
            <div className=" border-black shopping-cart-checkout-container">
                Checkout
            </div>
        </div>
    )


}
