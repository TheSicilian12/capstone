import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleCart.css'
import '../UniversalCSS.css'
import { getSingleCartTHUNK } from '../../store/cart';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const cartId = Number(useParams().cartId)

    const singleCart = cart.items
    console.log('singleCart: ', singleCart)
    useEffect(() => {
        dispatch(getSingleCartTHUNK(cartId))
    }, [dispatch])

    if (!singleCart) return <div>loading</div>

    console.log("cart: ", cart)

    return(
        <div className="single-product-image-container border-black">
            Hello
            Items
            {Object.values(singleCart).map(item => {
                return (
                    <div key={item.id}>
                        {/* <NavLink key={item.id} to={`/products/${item.id}`}>{item.SKU}</NavLink> */}
                        <ul>{item.id}</ul>
                    </div>
                )
            })}
        </div>
    )


}
