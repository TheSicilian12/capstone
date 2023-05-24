import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './HomePage.css';
import '../UniversalCSS.css'
import { getAllProductsTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart';
import ProductContainer from '../ProductContainer';

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
        <div className="border-black home-page-container">
            {Object.values(products).map(product => {
                return (
                    <div key={product.SKU}>
                        <ProductContainer product={product}/>
                    </div>
                )
            })}
        </div>
    )


}
