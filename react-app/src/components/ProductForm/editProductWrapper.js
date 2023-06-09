import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getSingleProductTHUNK } from '../../store/product';
import ProductForm from "./index.js";

import './GroupForm.css'
import '../UniversalCSS.css'

export default function EditProductForm() {
    const dispatch = useDispatch();

    const productId = useParams().productId

    useEffect(() => {
        dispatch(getSingleProductTHUNK(productId))
    }, [dispatch, productId])

    const productInfo = useSelector((state) => state.products.product)
    // console.log("product info: ", productInfo)

    if (!productInfo) {
       return (<div>loading edit</div>)
    }

    let mainImage;
    let imageArray = [];
    Object.values(productInfo.images).forEach(image => {
        if (image.main_image === "yes") {
            mainImage = image
        } else imageArray.push(image)
    })

    return (
        <ProductForm productInfo={productInfo}
                    formType={"edit"}
                    productId={productId}
                    mainProductImage={mainImage}
                    imageArray={imageArray}/>
    )
}
