import { NavLink } from 'react-router-dom'
// import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';

import './ProductContainer.css'
import '../UniversalCSS.css'
import { priceTwoDecimals } from '../GeneralFunctions'
// import StandardProductBox from '../StandardProductBox'
// import { getAllProductsTHUNK } from '../../store/product';

export default function ProductContainer({ product }) {
    let mainImage = Object.values(product.images).find(image => {
        return image.main_image === "yes"
    })

    let price = priceTwoDecimals(product.price)

    return (
        <div className="homepage-single-product-container break-word homepage-product shinano-font">

            <NavLink className="text-underline-none" key={product.id} to={`/products/${product.id}`}>
                <img
                    alt="Main product"
                    className='single-product-container-image-width'
                    src={`${mainImage.image_url}`}
                />
                <p className="justify-center single-product-container-name-overflow single-product-text-black shinano-font">{product.name}</p>
                <p className="justify-center single-product-text-black">${price}</p>

            </NavLink>
        </div>
    )
}
