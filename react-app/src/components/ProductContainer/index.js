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
        <div className="homepage-single-product-container break-word">

            <NavLink key={product.id} to={`/products/${product.id}`}>
                <img className='single-product-container-image-width'
                        src={`${mainImage.image_url}`}
                        />
                <p className="justify-center">{product.name}</p>
                <p className="justify-center">{product.price}</p>

            </NavLink>
         </div>
    )
}
