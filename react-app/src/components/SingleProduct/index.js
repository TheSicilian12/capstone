import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DeleteSingleProductModal from '../DeleteSingleProductModal';

import './SingleProduct.css'
import '../UniversalCSS.css'
import StandardButtons from '../StandardButtons';
import { getSingleProductTHUNK } from '../../store/product';
import { postItemCartTHUNK, getSingleCartTHUNK } from '../../store/cart'
import OpenModalButton from '../OpenModalButton';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.carts)
    // console.log("cart: ", typeof cart)

    const productId = Number(useParams().productId)

    const singleProduct = products.product
    // console.log('singleProduct: ', singleProduct)
    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
        dispatch(getSingleCartTHUNK(user.id))
    }, [dispatch])

    if (!singleProduct) return <div>loading</div>

    // console.log("products: ", products)

    const addProduct = () => {
        console.log("cart: ", cart.id)
        console.log("userId: ", user.id)
        console.log("productId: ", productId)
        const payload = {
            cart_id: cart.id,
            product_id: productId
        }
        dispatch(postItemCartTHUNK(payload))
    }

    return(
        <div className="single-product-image-container border-black">
            Hello
            {singleProduct.SKU}

            <div>
                <StandardButtons text="edit" path={`/products/${productId}/edit`} />
                <OpenModalButton
                    buttonText="Delete"
                    className="buttons-small"
                    modalComponent={<DeleteSingleProductModal productId={productId}/>}
                />
                <button onClick={addProduct}>Add to shopping cart</button>
            </div>

        </div>
    )


}
