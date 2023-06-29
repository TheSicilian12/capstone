import React from 'react';

import './SingleProductImageComponent.css'
import '../UniversalCSS.css'

export default function SingleProductImageComponent({mainImage, images}) {
    // hold current image
    // On click change current image to change what is being displayed
    let displayImage = mainImage.image_url

    let subImageTotal = images.length;
    console.log("images: ", images)
    console.log("subImageTotal: ", subImageTotal)

    images.map(image => console.log(image))
    return (
        <div className="single-product-image-container">
            <div className="single-product-current-image-container">
                <img
                    alt="Main product"
                    className='single-product-main-image'
                    src={`${displayImage}`}
                />
            </div>
            <div className="border-black single-product-mini-image-container">
                {images.map(image => (
                    <img
                    alt="Main product"
                    className='single-product-main-image'
                    src={`${image.image_url}`}
                    />
                ))

            }

            </div>
        </div>
    )
}
