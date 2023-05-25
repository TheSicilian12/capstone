import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DeleteItemCart.css'
import '../UniversalCSS.css'
import { getSingleCartTHUNK, deleteItemCartTHUNK } from '../../store/cart';

export default function DeleteItemCart({itemId, className}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    const remove = async () => {
        console.log("itemId: ", itemId)
        console.log("remove button")
        await dispatch(deleteItemCartTHUNK(itemId))
        // dispatch(getSingleCartTHUNK(user.id))
    }

    return(
            <button
                className={className ? `${className}` : ""}
                onClick={remove}>
                    Remove
            </button>
    )
}
