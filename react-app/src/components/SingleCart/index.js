import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './SingleCart.css'
import '../UniversalCSS.css'
import { deleteCartTHUNK, deleteItemCartTHUNK, deleteSpecItemSpecCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
import DeleteItemCart from '../DeleteItemCart';

export default function SingleCart() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart)


    // const cartId = Number(useParams().cartId)

    const singleCart = cart.carts
    // const totalPrice = cart.totalPrice

    useEffect(() => {
        dispatch(getSingleCartTHUNK())
    }, [dispatch])

    const keepShopping = async () => {
        const payload = {
            user_id: user.id,
            total_price: 0,
            product_ids: []
        }
        await dispatch(postCartTHUNK(payload))
        history.push("/")
        await dispatch(getSingleCartTHUNK())
    }

    const deleteAll = async (id) => {
        console.log("delete all button")
        await dispatch(deleteSpecItemSpecCartTHUNK(id))
    }

    if (!singleCart || Object.values(singleCart.items).length === 0) return <div>
        Your cart is currently empty
        <button onClick={keepShopping}>Keep Shopping</button>
    </div>
    console.log('singleCart frontend: ', singleCart.items)

    const purchase = async () => {
        await dispatch(deleteCartTHUNK())
        const payload = {
            user_id: user.id,
            total_price: 0,
            product_ids: []
        }
        await dispatch(postCartTHUNK(payload))
        // dispatch(getSingleCartTHUNK())
        await dispatch(getSingleCartTHUNK())
    }

    // patch for the quanitity display issue
    // itemCart = {
    //     itemId: {
    //         item: {},
    //         quantity: num,
    //         mainImage: str
    //     }
    // }


    let itemCart = {}
    let subTotal = 0;
    for (let e of Object.values(singleCart.items)) {
        // console.log("e: ", e)
        // console.log("key check: ", itemCart[e.item.id])
        subTotal += e.item.price
        if (!itemCart[e.item.id]) {
            itemCart[e.item.id] = { quantity: 1, item: e.item, mainImage: e.mainImage.image_url }
        } else {
            itemCart[e.item.id].quantity += 1;
        }
    }
    // console.log("itemCart: ", itemCart)
    // console.log("subTotal: ", subTotal)

    return (
        <div className="shopping-cart-page-container">
            <div className="shopping-cart-container white-background">
                <h1>Shopping Cart</h1>
                {/* {Object.values(singleCart.items).map(item => { */}
                {Object.values(itemCart).map(item => {
                    return (
                        <div className="shopping-cart-product-container">
                            <div className="shopping-cart-page-info">
                                <img
                                    className="shopping-cart-image"
                                    src={item.mainImage}
                                />
                                <div className="shopping-cart-text-container">
                                    <p className="shopping-cart-bold">{item.item.name}</p>


                                    <div className="shopping-cart-page-info-quan-delete">
                                        {item.item.inventory > 5 && <p>In Stock</p>}
                                        {item.item.inventory === 5 && <p>Only 5 left in stock</p>}
                                        {item.item.inventory === 4 && <p>Only 4 left in stock</p>}
                                        {item.item.inventory === 3 && <p>Only 3 left in stock</p>}
                                        {item.item.inventory === 2 && <p>Only 2 left in stock</p>}
                                        {item.item.inventory === 1 && <p>Only 1 left in stock</p>}
                                        {item.item.inventory === 0 && <p>Out of stock</p>}
                                        <div className="shopping-cart-quan-del-container">
                                            <div className="shopping-cart-quantity-container">Qty: {item.quantity}</div>
                                            <button
                                                className="shopping-cart-delete-button"
                                                onClick={() => deleteAll(item.item.id, item.quantity)}>
                                                    Delete
                                            </button>
                                            <DeleteItemCart itemId={item.item.id} />
                                        </div>
                                        {/* <button onClick={() => deleteAll(item.item.id, item.quantity)} className="shopping-cart-delete-button">Delete</button> */}
                                    </div>
                                </div>
                            </div>
                            <p className="shopping-cart-bold">${(Number(item.item.price) * Number(item.quantity)).toFixed(2)}</p>
                        </div>
                    )
                })}
                <div className="subTotal-container">
                    <h7 className="subTotal-main-margin">Subtotal({Object.values(singleCart.items).length} items): </h7>
                    {/* Rounding update needed */}
                    <h7 className="subTotal-main-margin subTotal-price-bold">${subTotal.toFixed(2)}</h7>
                </div>
                {/* {Object.keys(singleCart.quantityDict).map(qKey => {
                    let items = Object.values(singleCart.items)
                    // console.log("item obj: ", items)
                    // console.log("qKey: ", qKey)
                    // console.log("qKey type: ", typeof qKey)
                    let item = items.find(item => item.id === Number(qKey))
                    // console.log("cart item: ", item)
                    return (
                        <div className="border-black shopping-cart-product-container">
                            <div className="">
                                <p className="shopping-cart-bold">{item.name}</p>
                                <p>stock: {item.inventory}</p>
                                <p>quantity: {singleCart.quantityDict[Number(qKey)]}</p>

                                {item.inventory > 5 && <p>In Stock</p>}
                                {item.inventory === 5 && <p>Only 5 left in stock</p>}
                                {item.inventory === 4 && <p>Only 4 left in stock</p>}
                                {item.inventory === 3 && <p>Only 3 left in stock</p>}
                                {item.inventory === 2 && <p>Only 2 left in stock</p>}
                                {item.inventory === 1 && <p>Only 1 left in stock</p>}
                                {item.inventory === 0 && <p>Out of stock</p>}
                                <DeleteItemCart itemId={item.id} />
                            </div>
                            <p className="shopping-cart-bold">${item.price}</p>
                        </div>
                    )
                })} */}
            </div>
            <div className="border-black shopping-cart-checkout-container white-background">
                <div className="cart-subTotal-container">
                    <h7 className="cart-subTotal-main-margin">Subtotal({Object.values(singleCart.items).length} items): </h7>
                    {/* This does not round correctly! */}
                    <h7 className="cart-subTotal-main-margin cart-subTotal-price-bold">${subTotal.toFixed(2)}</h7>
                </div>
                <button
                    className="button-no-dimensions cart-checkout-button"
                    onClick={purchase}>
                    Checkout
                </button>
            </div>
        </div>
    )


}
