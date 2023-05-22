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
        <div className="single-product-image-container">
            <div>
                {Object.values(singleCart.items).map(item => {
                    return (
                        <div className="border-black">
                            <h1>hello</h1>
                            {/* <NavLink key={item.id} to={`/products/${item.id}`}>{item.SKU}</NavLink> */}
                            <ul>product name: {item.name}</ul>
                            <ul>product id: {item.id}</ul>
                            {/* <button onClick={remove}>Remove from cart</button> */}
                            <DeleteItemCart itemId={item.id} />
                        </div>

                    )
                })}
            </div>
        </div>

    )


}
