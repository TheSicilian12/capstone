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
    
    return(
       <div className="border-black">
            <NavLink key={product.SKU} to={`/products/${product.id}`}>
                {product.name}
                {product.images}

            </NavLink>
       </div>
    )
}
