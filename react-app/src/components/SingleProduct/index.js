import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';

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
import SingleProductImageComponent from '../SingleProductImageComponent';
import StarRatingDisplayComponent from '../StarRatingDisplayComponent';
import StarRatingProductDisplayComponent from '../StarRatingProductDisplayComponent';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.carts)
    const history = useHistory()

    const productId = Number(useParams().productId)

    const singleProduct = products.product
    // console.log("singleProduct: ", singleProduct)
    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
        if (user) dispatch(getSingleCartTHUNK(user.id))
    }, [dispatch, user, productId])

    if (!singleProduct) return <div>loading single product</div>

    const cartId = cart?.id
    let userId;
    if (user) userId = user.id
    let mainImage;
    let images = [];

    Object.values(products.product.images).forEach(image => {
        if (image.main_image === "yes") mainImage = image
        else images.push(image)
    })

    const editRedirect = () => {
        history.push(`/products/${productId}/edit`)
    }

    images.unshift(mainImage)

    return (
        <div className="single-product-page-container">
            <div className="single-product-container">
                <SingleProductImageComponent images={images} />

                <div className="single-product-info-container">
                    <div className="single-product-header-container break-word">
                        <div>
                            <h4>{singleProduct.name}</h4>
                            <StarRatingProductDisplayComponent productId={singleProduct?.id} />
                        </div>
                    </div>
                    <p className="single-product-desc-container">{singleProduct?.desc}</p>
                </div>

                {/* If not logged in, see add to cart section, but no options, if logged in add to cart option, if owner then edit section */}
                {!user || !(user.id === singleProduct.ownerId) ? <div className="single-product-cart-container">
                    <h3>Add to cart</h3>
                    {products.product.inventory ? <div className="text-green">In Stock</div>
                        : <div className="text-red">false</div>}
                    {user && <AddItemCart className={"button-no-dimensions single-product-user-buttons"} cartId={cartId} userId={userId} productId={productId} />}
                    {user && <DeleteItemCart className={"button-no-dimensions single-product-user-buttons"} itemId={productId} />}
                    {!user && <NavLink to='/login'>
                        You must log in to start shopping
                        </NavLink>}
                </div>
                    : <div className="single-edit-cart-container">
                        <h3>Edit your product</h3>
                        <div className="single-product-edit-buttons-container">
                            <button className="button-no-dimensions single-product-user-buttons" onClick={editRedirect}>Edit</button>
                            <OpenModalButton
                                buttonText="Delete"
                                className="button-full-red single-product-user-buttons"
                                modalComponent={<DeleteSingleProductModal productId={productId} />}
                            />
                        </div>
                    </div>}
            </div>

            <div>
                <CommentsComponent productId={singleProduct?.id} />
            </div>
        </div>
    )
}
