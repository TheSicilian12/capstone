import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DeleteItemCart.css'
import '../UniversalCSS.css'
import { getSingleCartTHUNK, deleteItemCartTHUNK } from '../../store/cart';

export default function DeleteItemCart({item}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    const remove = async () => {
        console.log(item.id)
        console.log("remove button")
        await dispatch(deleteItemCartTHUNK(item.id))
        dispatch(getSingleCartTHUNK(user.id))
    }

    return(
        <div>
            <button onClick={remove}>Remove from cart</button>
        </div>
    )
}
