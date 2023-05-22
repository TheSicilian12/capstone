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


    if (!singleCart) return <div>loading</div>
    console.log('singleCart frontend: ', singleCart.items)
    // console.log("cart: ", cart)

    const remove = (itemId) => {
        console.log(itemId)
        console.log("remove button")
        dispatch(deleteItemCartTHUNK(itemId))
        // dispatch(getItemsSingleCartTHUNK(cartId))
    }



    return(
        <div className="single-product-image-container">
            Hello
            {/* Items total: ${totalPrice} */}
            {Object.values(singleCart.items).map(item => {
                return (
                    <div className="border-black">
                        <h1>hello</h1>
                        {/* <NavLink key={item.id} to={`/products/${item.id}`}>{item.SKU}</NavLink> */}
                        <ul>product name: {item.name}</ul>
                        <ul>product id: {item.id}</ul>
                        <button onClick={remove}>Remove from cart</button>
                        {/* <DeleteItemCart item={item} cartId={cartId}/> */}
                    </div>
                    // <div>hello</div>
                )
            })}
        </div>
        // <div>hello</div>
    )


}
