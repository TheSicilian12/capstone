import React, { useEffect, useState } from 'react';
import { useDispatch, useSel, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import './SingleProduct.css'
import '../UniversalCSS.css'
import StandardProductBox from '../StandardProductBox'
import { getSingleProductTHUNK } from '../../store/product';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    const productId = Number(useParams().productId)

    const singleProduct = products.product
    console.log('singleProduct: ', singleProduct)
    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
    }, [dispatch])

    if (!singleProduct) return <div>loading</div>

    console.log("products: ", products)

    return(
        <div>
            Hello
            {singleProduct.SKU}
        </div>
    )


}
