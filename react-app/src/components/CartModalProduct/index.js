import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



import './CartModalProduct.css'
import '../UniversalCSS.css'
import DeleteItemCart from '../DeleteItemCart';


export default function CartModalProduct({item}) {
    console.log("cart modal product: ", item)
    return (
       <div className="cart-modal-product-container">
            <div className="cart-modal-product-margin">
                <p>{item.item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>subTotal: ${(Number(item.item.price) * Number(item.quantity)).toFixed(2)}</p>
            </div>
            <div className="cart-modal-product-delete-button">
                <DeleteItemCart className={"button-full-red margin2 "} itemId={item.item.id} />
            </div>
       </div>
    )
}
