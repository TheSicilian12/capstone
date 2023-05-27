import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



import './CartModalProduct.css'
import '../UniversalCSS.css'
import DeleteItemCart from '../DeleteItemCart';


export default function CartModalProduct({item}) {


    return (
       <div className="cart-modal-product-container">
            <div className="">
                <p>{item.name}</p>
                <p>${item.price}</p>
            </div>
            <div className="cart-modal-product-delete-button">
                <DeleteItemCart className={"button-full-red margin2 "} itemId={item.id} />
            </div>
       </div>
    )
}
