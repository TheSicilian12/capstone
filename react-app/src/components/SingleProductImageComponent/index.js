import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import DeleteSingleProductModal from '../DeleteSingleProductModal';
import CommentsComponent from '../CommentsComponent'

import './SingleProduct.css'
import '../UniversalCSS.css'
import { getSingleProductTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart'
import OpenModalButton from '../OpenModalButton';
import AddItemCart from '../AddItemCart';
import DeleteItemCart from '../DeleteItemCart';
import SingleProductMiniImage from '../SingleProductMiniImage';

export default function SingleProduct() {

    return (
        <div className="single-product-page-container">
            Hello
        </div>
    )
}
