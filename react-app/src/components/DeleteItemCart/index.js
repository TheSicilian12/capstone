import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DeleteItemCart.css'
import '../UniversalCSS.css'
import { getItemsSingleCartTHUNK, deleteItemCartTHUNK } from '../../store/cart';

export default function DeleteItemCart({item, cartId}) {
    const dispatch = useDispatch()

    const remove = async () => {
        console.log(item)
        console.log("remove button")
        await dispatch(deleteItemCartTHUNK(item.id))
        dispatch(getItemsSingleCartTHUNK(cartId))
    }

    return(
        <div>
            <button onClick={remove}>Remove from cart</button>
        </div>
    )
}
