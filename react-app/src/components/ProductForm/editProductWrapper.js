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
    }, [dispatch])

    const productInfo = useSelector((state) => state.products.product)
    // console.log("product info: ", productInfo)

    if (!productInfo) {
       return (<div>loading edit</div>)
    }

    let mainImageUrl;
    let imageArray = [];
    Object.values(productInfo.images).forEach(image => {
        if (image.main_image === "yes") {
            mainImageUrl = image.image_url
        } else imageArray.push(image.image_url)
    })

    return (
        <ProductForm productInfo={productInfo} formType={"edit"} productId={productId} mainImageUrl={mainImageUrl} imageArray={imageArray}/>
    )
}
