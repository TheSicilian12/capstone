import React from 'react';

import './SingleProductMiniImage.css'
import '../UniversalCSS.css'


export default function SingleProductMiniImage({className, imageUrl}) {


    return (
        <img
            alt = "Additional product images"
            className={`${className}`}
            src={`${imageUrl}`}
            />
    )
}
