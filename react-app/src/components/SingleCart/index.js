import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import DeleteSingleProductModal from '../DeleteSingleProductModal';

import './SingleCart.css'
import '../UniversalCSS.css'
import StandardButtons from '../StandardButtons';
import { getSingleCartTHUNK } from '../../store/cart';
import OpenModalButton from '../OpenModalButton';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts)

    const cartId = Number(useParams().cartId)

    const singleCart = carts.cart
    console.log('singleProduct: ', singleCart)
    useEffect(() => {
        dispatch(getSingleCartTHUNK(cartId))
    }, [dispatch])

    if (!singleCart) return <div>loading</div>

    console.log("carts: ", carts)

    return(
        <div className="single-product-image-container border-black">
            Hello
            {singleCart.id}
        </div>
    )


}
