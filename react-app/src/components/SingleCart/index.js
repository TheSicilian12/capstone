import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleCart.css'
import '../UniversalCSS.css'
import { deleteItemCartTHUNK, getSingleCartTHUNK } from '../../store/cart';
import DeleteItemCart from '../DeleteItemCart';

export default function SingleCart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    // const cartId = Number(useParams().cartId)

    // const singleCart = cart.items
    // const totalPrice = cart.totalPrice

    // console.log('singleCart frontend: ', singleCart)
    useEffect(() => {
        dispatch(getSingleCartTHUNK(1))
    }, [dispatch])


    // if (!singleCart) return <div>loading</div>
    // console.log("cart: ", cart)

    // const remove = (itemId) => {
    //     console.log(itemId)
    //     console.log("remove button")
    //     dispatch(deleteItemCartTHUNK(itemId))
    //     dispatch(getItemsSingleCartTHUNK(cartId))
    // }

    return(
        // <div className="single-product-image-container">
        //     Hello
        //     Items total: ${totalPrice}
        //     {Object.values(singleCart).map(item => {
        //         return (
        //             <div key={item.id} className="border-black">
        //                 {/* <NavLink key={item.id} to={`/products/${item.id}`}>{item.SKU}</NavLink> */}
        //                 <ul>item id: {item.id}</ul>
        //                 <ul>product name: {item.product.name}</ul>
        //                 <ul>product id: {item.product.id}</ul>
        //                 {/* <button onClick={remove}>Remove from cart</button> */}
        //                 <DeleteItemCart item={item} cartId={cartId}/>
        //             </div>
        //             // <div>hello</div>
        //         )
        //     })}
        // </div>
        <div>hello</div>
    )


}
