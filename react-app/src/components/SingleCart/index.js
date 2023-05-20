import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleCart.css'
import '../UniversalCSS.css'
import { getItemsSingleCartTHUNK, deleteItemCartTHUNK } from '../../store/cart';
import DeleteItemCart from '../DeleteItemCart';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const cartId = Number(useParams().cartId)

    const singleCart = cart.items

    console.log('singleCart: ', singleCart)
    useEffect(() => {
        dispatch(getItemsSingleCartTHUNK(cartId))
    }, [dispatch])


    if (!singleCart) return <div>loading</div>
    // console.log("cart: ", cart)

    const remove = (itemId) => {
        console.log(itemId)
        console.log("remove button")
        dispatch(deleteItemCartTHUNK(itemId))
        dispatch(getItemsSingleCartTHUNK(cartId))
    }

    return(
        <div className="single-product-image-container">
            Hello
            Items
            {Object.values(singleCart).map(item => {
                return (
                    <div key={item.id} className="border-black">
                        {/* <NavLink key={item.id} to={`/products/${item.id}`}>{item.SKU}</NavLink> */}
                        <ul>item id: {item.id}</ul>
                        <ul>product name: {item.product.name}</ul>
                        <ul>product id: {item.product.id}</ul>
                        {/* <button onClick={remove}>Remove from cart</button> */}
                        <DeleteItemCart item={item} cartId={cartId}/>
                    </div>
                    // <div>hello</div>
                )
            })}
        </div>
    )


}
