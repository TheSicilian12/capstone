import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import DeleteSingleProductModal from '../DeleteSingleProductModal';

import './SingleProduct.css'
import '../UniversalCSS.css'
import StandardButtons from '../StandardButtons';
import { getSingleProductTHUNK } from '../../store/product';
import { postItemCartTHUNK, getSingleCartTHUNK } from '../../store/cart'
import OpenModalButton from '../OpenModalButton';
import AddItemCart from '../AddItemCart';
import SingleCart from '../SingleCart';
import DeleteItemCart from '../DeleteItemCart';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.carts)
    const history = useHistory()

    const productId = Number(useParams().productId)

    console.log("productId: ", productId)

    const singleProduct = products.product
    // console.log('singleProduct: ', singleProduct)
    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
        dispatch(getSingleCartTHUNK(user.id))
    }, [dispatch])

    if (!singleProduct) return <div>loading single product</div>

    const cartId = cart?.id
    const userId = user.id

    const editRedirect = () => {
        history.push(`/products/${productId}/edit`)
    }

    return (
        <div className="border-blue single-product-page-container">
            <div className="border-black single-product-container">
                <div className="border-black single-product-image-container">
                    <div className="single-prdocut-main-image">

                    </div>
                </div>

                <div className="border-black single-product-info-container">
                    <div className="border-blue single-product-header-container">
                        <h1>{singleProduct.name}</h1>
                        <button OnClick={editRedirect()}>Edit</button>
                        <OpenModalButton
                            buttonText="Delete"
                            className="buttons-small"
                            modalComponent={<DeleteSingleProductModal productId={productId} />}
                        />
                    </div>
                    <p>{singleProduct.desc}</p>
                </div>

                <div className="border-black single-product-cart-container">
                    Add to cart
                    {products.product.inventory ? <div className="text-green">In Stock</div>
                        : <div className="text-red">false</div>}
                    <AddItemCart cartId={cartId} userId={userId} productId={productId} />
                    <DeleteItemCart itemId={productId} />
                </div>
            </div>
        </div>
    )


}
