import React, { useState } from 'react';

import './SingleProductImageComponent.css'
import '../UniversalCSS.css'

export default function SingleProductImageComponent({mainImage, images}) {
    // hold current image
    // On click change current image to change what is being displayed
    const [displayImage, setDisplayImage] = useState(images[0].image_url)

    return (
        <div className="single-product-image-container">
            <div className="single-product-current-image-container">
                <img
                    alt="Main product"
                    className='single-product-main-image'
                    src={`${displayImage}`}
                />
            </div>
            <div className="single-product-mini-image-container">
                {images.map(image => (
                    <img
                    alt="Main product"
                    className='single-product-mini-image'
                    onMouseEnter={() => setDisplayImage(image.image_url)}
                    src={`${image.image_url}`}
                    />
                ))

            }

            </div>
        </div>
    )
}
