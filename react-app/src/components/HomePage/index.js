import React, { useEffect, useState } from 'react';
import { useDispatch, useSel, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './HomePage.css';
import { getAllProductsTHUNK } from '../../store/product';

export default function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProductsTHUNK())
    }, [dispatch])

    if (!products) return <div>loading</div>

    console.log("products: ", products)

    return(
        <div>
            Hello
            {Object.values(products).map(product => {
                return (
                    <div key={product.SKU}>{product.SKU}</div>
                )
            })}

        </div>
    )


}
