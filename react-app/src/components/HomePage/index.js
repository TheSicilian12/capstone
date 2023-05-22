import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './HomePage.css';
import '../UniversalCSS.css'
import { getAllProductsTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart';

export default function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    // const items = useSelector(state => state.cart.carts.items)

    useEffect(() => {
        dispatch(getAllProductsTHUNK())
        dispatch(getSingleCartTHUNK())
    }, [dispatch])

    if (!products) return <div>loading homepage</div>

    return (
        <div>
            Hello
            {Object.values(products).map(product => {
                return (
                    <div key={product.SKU}>
                        <NavLink key={product.SKU} to={`/products/${product.id}`}>{product.SKU}</NavLink>
                    </div>
                )
            })}
        </div>
    )


}
