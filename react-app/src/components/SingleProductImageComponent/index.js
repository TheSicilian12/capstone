import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import DeleteSingleProductModal from '../DeleteSingleProductModal';
import CommentsComponent from '../CommentsComponent'

import './SingleProductImageComponent.css'
import '../UniversalCSS.css'
import { getSingleProductTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart'
import OpenModalButton from '../OpenModalButton';
import AddItemCart from '../AddItemCart';
import DeleteItemCart from '../DeleteItemCart';
import SingleProductMiniImage from '../SingleProductMiniImage';

export default function SingleProductImageComponent({mainImage, images}) {
    // hold current image
    // On click change current image to change what is being displayed
    let displayImage = mainImage.image_url


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

            </div>
        </div>
    )
}
