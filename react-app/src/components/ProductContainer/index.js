import { useHistory, NavLink } from 'react-router-dom'
// import React, { useEffect, useState } from 'react';
import { useDispatch, useSel, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import './ProductContainer.css'
import '../UniversalCSS.css'
import { getSingleCartTHUNK } from '../../store/cart';
import { getSingleProductTHUNK } from '../../store/product';
// import StandardProductBox from '../StandardProductBox'
// import { getAllProductsTHUNK } from '../../store/product';

export default function ProductContainer({product}) {
    const history = useHistory();

    let mainImage = Object.values(product.images).find(image => {
        return image.main_image === "yes"
    })


    return(
            <NavLink className="border-black homepage-single-product-container" key={product.SKU} to={`/products/${product.id}`}>
                <img className='border-green'
                        src={`${mainImage.image_url}`}
                />
                {product.name}
                {product.price}
            </NavLink>
    )
}
