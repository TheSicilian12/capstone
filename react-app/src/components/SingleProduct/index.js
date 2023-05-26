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
    const history = useHistory()

    const productId = Number(useParams().productId)

    // console.log("productId: ", productId)

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

    // console.log("mainImage: ", mainImage)
    // console.log("images: ", images)

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
                            return (<div className="border-black single-product-sub-single-image-container">
                                <SingleProductMiniImage
                                    className={"single-product-image-mini-container"}
                                    imageUrl={image.image_url} />
                            </div>)
                        })
                        }
                    </div>
                </div>

                <div className="border-black single-product-info-container">
                    <div className="single-product-header-container">
                        <h1>{singleProduct.name}</h1>

                        { user && user.id === singleProduct.ownerId && <div className="single-product-owner-buttons-container ">
                            <button className="button-small margin2" onClick={editRedirect}>Edit</button>
                            <OpenModalButton
                                buttonText="Delete"
                                className="button-small margin2"
                                modalComponent={<DeleteSingleProductModal productId={productId} />}
                            />
                        </div>}
                    </div>
                    <p>{singleProduct.desc}</p>
                </div>

                <div className="border-black single-product-cart-container">
                    Add to cart
                    {products.product.inventory ? <div className="text-green">In Stock</div>
                        : <div className="text-red">false</div>}
                    {user && <AddItemCart className={"button-full margin2"} cartId={cartId} userId={userId} productId={productId} />}
                    {user && <DeleteItemCart className={"button-full margin2"} itemId={productId} />}
                </div>
            </div>

        </div>
    )
}
