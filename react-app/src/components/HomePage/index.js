import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './HomePage.css';
import '../UniversalCSS.css'
import { getAllProductsTHUNK } from '../../store/product';

export default function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProductsTHUNK())
    }, [dispatch])

    if (!products) return <div>loading</div>

    console.log("products: ", products)

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
