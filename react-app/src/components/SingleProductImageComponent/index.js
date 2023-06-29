import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import DeleteSingleProductModal from '../DeleteSingleProductModal';
import CommentsComponent from '../CommentsComponent'
import ImageGallery from 'react-image-gallery';

import './SingleProductImageComponent.css'
import '../UniversalCSS.css'
import { getSingleProductTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart'
import OpenModalButton from '../OpenModalButton';
import AddItemCart from '../AddItemCart';
import DeleteItemCart from '../DeleteItemCart';
import SingleProductMiniImage from '../SingleProductMiniImage';

export default function SingleProduct() {
    const testImages = [
        {
            originial: mainImage.image_url,
            thumbnail: mainImage.image_url
        }
    ]

    return (
        <div className="single-product-page-container">
                <ImageGallery items={testImages} />
        </div>
    )
}
