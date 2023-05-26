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
                {Object.values(singleCart.items).map(item => {
                    return (
                        <div className="shopping-cart-product-container">
                            <div className="border-black">
                                <h2>product name: {item.name}</h2>
                                <ul>price: ${item.price}</ul>
                                <ul>stock: {item.inventory}</ul>
                                <DeleteItemCart itemId={item.id} />
                            </div>
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
