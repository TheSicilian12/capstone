import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import './AddItemCart.css'
import '../UniversalCSS.css'
import { getItemsSingleCartTHUNK, getSingleCartTHUNK, updateItemCartTHUNK } from '../../store/cart';

export default function AddItemCart({cartId, userId, productId}) {
    const dispatch = useDispatch()
    const {totalItems, setTotalItems} = useCart()
    const user = useSelector(state => state.session.user)

    console.log("-----------button productId: ", productId)

    const addProduct = () => {
        // console.log("cart: ", cartId)
        // console.log("userId: ", userId)
        console.log("productId: ", productId)
        const payload = {
            user_id: user.id,
            product_ids: 1,
            total_price: 100
        }
        dispatch(updateItemCartTHUNK(payload))
        // dispatch(getItemsSingleCartTHUNK(cartId))
        setTotalItems(totalItems + 1)
    }

    return(
        <div>
            <button onClick={addProduct}>Add to shopping cart</button>
        </div>
    )
}
