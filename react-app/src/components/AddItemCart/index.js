import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './AddItemCart.css'
import '../UniversalCSS.css'
import { getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK, updateItemCartTHUNK } from '../../store/cart';

export default function AddItemCart({cartId, userId, productId, className}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const cartCheck = useSelector(state => state.cart)

    // console.log("-----------button productId: ", productId)

    const addProduct = () => {
        // console.log("cart: ", cartId)
        // console.log("userId: ", userId)
        // console.log("productId: ", productId)
        if (cartCheck["errors"]) {
            const payload = {
                user_id: user.id,
                total_price: 0,
                product_ids: []
            }
            dispatch(postCartTHUNK(payload))
            dispatch(getSingleCartTHUNK())
        }

        const payload = {
            user_id: user.id,
            product_ids: productId,
            total_price: 100
        }
        dispatch(updateItemCartTHUNK(payload))
        // dispatch(getItemsSingleCartTHUNK(cartId))
    }

    return(
            <button
                className={className ? `${className}` : ""}
                onClick={addProduct}>
                    Add to shopping cart
            </button>
    )
}
