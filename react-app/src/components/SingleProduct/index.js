import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './SingleProduct.css'
import '../UniversalCSS.css'
import StandardButtons from '../StandardButtons';
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
        <div className="single-product-image-container border-black">
            Hello
            {singleProduct.SKU}

            <div>
                <StandardButtons text="edit" />
                <StandardButtons text="delete" />
            </div>

        </div>
    )


}
