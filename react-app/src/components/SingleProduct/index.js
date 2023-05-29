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
import SingleProductMiniImage from '../SingleProductMiniImage';

export default function SingleProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.carts)
    const cartCheck = useSelector(state => state.cart)
    const history = useHistory()

    const productId = Number(useParams().productId)

    // console.log("productId: ", productId)
    // console.log("cartCheck: ", cartCheck)

    const singleProduct = products.product
    // console.log('singleProduct: ', singleProduct)
    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
        if (user) dispatch(getSingleCartTHUNK(user.id))
    }, [dispatch])

    if (!singleProduct) return <div>loading single product</div>

    const cartId = cart?.id
    let userId;
    if (user) userId = user.id
    let mainImage;
    let images = [];

    Object.values(products.product.images).forEach(image => {
        // console.log("image: ", image)
        if (image.main_image === "yes") mainImage = image
        else images.push(image)
    })

    const editRedirect = () => {
        history.push(`/products/${productId}/edit`)
    }

    return (
        <div className="single-product-page-container">
            <div className="single-product-container">

                <div className="single-product-image-container">
                    <img className='single-product-main-image'
                        src={`${mainImage.image_url}`}
                    />

                    <div className='single-product-sub-images-container display-flex'>
                        {images.map(image => {
                            return (<div className="single-product-sub-single-image-container">
                                <SingleProductMiniImage
                                    className={"single-product-image-mini-container"}
                                    imageUrl={image.image_url} />
                            </div>)
                        })
                        }
                    </div>
                </div>
                <div className="single-product-info-container">
                    <div className="single-product-header-container">
                        <h1>{singleProduct.name}</h1>
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
                    {!user && <div>You must log in to start shopping</div>}
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
        </div>
    )
}
