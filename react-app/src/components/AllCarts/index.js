import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './AllCarts.css';
import '../UniversalCSS.css'
import { getAllCartsTHUNK } from '../../store/cart';

export default function AllCarts() {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts)

    useEffect(() => {
        dispatch(getAllCartsTHUNK())
    }, [dispatch])

    if (!carts) return <div>loading</div>

    console.log("carts: ", carts)

    return (
        <div>
            Hello
            {Object.values(carts).map(cart => {
                return (
                    <div key={cart.id}>
                        <NavLink key={cart.id} to={`/carts/${cart.id}`}>{cart.id}</NavLink>
                    </div>
                )
            })}
        </div>
    )


}
