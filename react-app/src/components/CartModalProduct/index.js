import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



import './CartModalProduct.css'
import '../UniversalCSS.css'
import DeleteItemCart from '../DeleteItemCart';
import { deleteItemCartTHUNK, updateItemCartTHUNK } from '../../store/cart';


export default function CartModalProduct({ item }) {
    const dispatch = useDispatch();
    // console.log("cart modal product: ", item)

    const user = useSelector(state => state.session.user)

    const deleteSingle = async (id) => {
        await dispatch(deleteItemCartTHUNK(id))
    }

    const addSingle = async (item) => {
        const payload = {
            user_id: user.id,
            product_ids: item.id,
            total_price: 1
        }
        await dispatch(updateItemCartTHUNK(payload))
    }

    return (
        <div className="cart-modal-product-container">
            <div className="display-flex">
                <div className="cart-modal-product-margin break-word">
                    <p>{item.item.name}</p>
                </div>
                <div className="cart-modal-quan-subtotal-container">
                    <div className="cart-modal-quantity-container">Qty: {item.quantity}</div>
                    <div className="cart-modal-subtotal-container">${(Number(item.item.price) * Number(item.quantity)).toFixed(2)}</div>
                </div>
            </div>
            <div className="cart-modal-add-delete">
                {/* <DeleteItemCart className={"button-full-red margin2 "} itemId={item.item.id} /> */}
                <button
                    className="shopping-cart-no-display-button"
                    onClick={() => addSingle(item.item)}>
                    <i className="shopping-cart-plus-minus fa fa-plus"></i>
                </button>
                <button
                    className="shopping-cart-no-display-button"
                    onClick={() => deleteSingle(item.item.id)}>
                    <i className="shopping-cart-plus-minus fa fa-minus"></i>
                </button>
            </div>
        </div>
    )
}
