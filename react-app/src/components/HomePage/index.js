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
    const user = useSelector(state => state.session.user)
    // const items = useSelector(state => state.cart.carts.items)

    useEffect(() => {
        dispatch(getAllProductsTHUNK())
        if (user) dispatch(getSingleCartTHUNK())
    }, [dispatch])

    if (!products) return <div>loading homepage</div>

    return (
        <div className="justify-center homepage-margin-top">
            <div className="homepage-container">
                {Object.values(products).map(product => {
                    return (
                        <div className="homepage-margin-product homepage-product" key={product.id}>
                            <ProductContainer product={product} />
                        </div>
                    )
                })}
            </div>
        </div>
    )


}
