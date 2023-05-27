import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { editProductTHUNK, postProductTHUNK } from '../../store/product';
import shinanoLogoMini from "../assets/Images/ShinanoLogoSmall.jpg"

import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm({ productInfo, formType, productId, mainProductImage, imageArray }) {
    // console.log("productInfo: ", productInfo ? productInfo.SKU : "test")
    // console.log("formType: ", formType)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    // const [sku, setSKU] = useState(productInfo ? productInfo.SKU : "");
    const [name, setName] = useState(productInfo ? productInfo.name : "");
    const [disNameErr, setDisNameErr] = useState(false);
    const [price, setPrice] = useState(productInfo ? productInfo.price : "");
    const [disPriceErr, setDisPriceErr] = useState(false);
    const [desc, setDesc] = useState(productInfo ? productInfo.desc : "");
    const [disDescErr, setDisDescErr] = useState(false);
    const [inventory, setInventory] = useState(productInfo ? productInfo.inventory : "");
    const [disInventoryErr, setDisInventoryErr] = useState(false);
    const [mainImage, setMainImage] = useState(mainProductImage ? mainProductImage.image_url : "");
    const [disMainImageErr, setDisMainImageErr] = useState(false);
    const [subImage1, setSubImage1] = useState(imageArray && imageArray[0] ? imageArray[0].image_url : "");
    const [disSubImage1Err, setDisSubImage1Err] = useState(false);
    const [subImage2, setSubImage2] = useState(imageArray && imageArray[1] ? imageArray[1].image_url : "");
    const [disSubImage2Err, setDisSubImage2Err] = useState(false);
    const [subImage3, setSubImage3] = useState(imageArray && imageArray[2] ? imageArray[2].image_url : "");
    const [disSubImage3Err, setDisSubImage3Err] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("add product")


        if (name && price && desc && inventory && mainImage) {
            let payload = {
                // SKU: sku,
                name,
                price,
                desc,
                inventory,
                images: [], //images is a list of dictionaries for mass upload
                owner_id: user.id
            }

            // This is  a bad way to do this, but I have a time crunch.
            let imageHolder = {}

            // if form type add to payload
            imageHolder.image_url = mainImage
            imageHolder.main_image = "yes"
            imageHolder.deleteImg = "no"
            if (formType === "edit" && mainProductImage) imageHolder.image_id = mainProductImage.id
            payload.images.push(imageHolder)


            imageHolder = {}
            imageHolder.image_url = subImage1
            imageHolder.main_image = "no"
            if (formType === "edit" && imageArray[0]) imageHolder.image_id = imageArray[0].id
            if (formType === "edit" && imageArray[0] && subImage1.length === 0) {
                // console.log("subImage1 if statement")
                imageHolder.deleteImg = "delete"
            } else imageHolder.deleteImg = "no"

            payload.images.push(imageHolder)


            imageHolder = {}
            imageHolder.image_url = subImage2
            imageHolder.main_image = "no"
            if (formType === "edit" && imageArray[1]) imageHolder.image_id = imageArray[1].id
            if (formType === "edit" && imageArray[1] && subImage2.length === 0) {
                imageHolder.deleteImg = "delete"
            } else imageHolder.deleteImg = "no"

            payload.images.push(imageHolder)

            // console.log("subImg 2: ", imageHolder.delete)


            imageHolder = {}
            imageHolder.image_url = subImage3
            imageHolder.main_image = "no"
            if (formType === "edit" && imageArray[2]) imageHolder.image_id = imageArray[2].id
            if (formType === "edit" && imageArray[2] && subImage3.length === 0) {
                imageHolder.deleteImg = "delete"
            } else imageHolder.deleteImg = "no"

            payload.images.push(imageHolder)

            let data
            if (formType === "new") {
                // console.log("new if statement")
                data = await dispatch(postProductTHUNK(payload))
            }
            // console.log("createProduct: ", createProduct)
            if (formType === "edit") {
                // console.log("edit if statement")
                data = await dispatch(editProductTHUNK(payload, productId))
            }

            if (data) {
                // console.log("data if statement")
                // console.log(createProduct.product.id)
                history.push(`/products/${data.product.id}`)
            }
        } else {
            return console.log("ERROR In ADD / EDIT a produact")
        }

        // console.log('submit button')
    }

    const checkValidImage = (checkImage) => {
        let imageRouteSplit = checkImage.split('.')
        let imageRouteCheck = imageRouteSplit[imageRouteSplit.length - 1]
        if (imageRouteCheck !== 'png' &&
            imageRouteCheck !== 'jpg' &&
            imageRouteCheck !== 'jpeg') {
            // console.log(imageRouteSplit)
            // console.log(imageRouteCheck)
            return false;
        }
        return true;
    }


    let err = {}
    if (name.length < 4) err.name = "The product's name should be 4+ characters."
    if (price <= 0) err.price = "The product needs to cost something."
    if (desc.length < 50) err.desc = "The product's description should be 50+ characters."
    if (price.toString().includes('.')) {
        if (price.toString().split('.')[1].length > 2) {
            err.price = 'Please either round the price or specify the price to two decimals.'
        }
    }
    if (!(Number(inventory) > 0)) err.inventory = "Inventory is required. The inventory must be a positive number."
    if (inventory.toString().includes('.')) err.inventory = "Inventory must not have any decimals."
    // Every product must have a main image
    if (!checkValidImage(mainImage)) err.mainImage = "Image url must end in png, jpg, or jpeg."
    // Sub images are optional for products
    if (subImage1 && !checkValidImage(subImage1)) err.subImage1 = "Image url must end in png, jpg, or jpeg."
    if (subImage2 && !checkValidImage(subImage2)) err.subImage2 = "Image url must end in png, jpg, or jpeg."
    if (subImage3 && !checkValidImage(subImage3)) err.subImage3 = "Image url must end in png, jpg, or jpeg."

    // Disable button if errors
    let disableLogin = "button-disabled";
    if (!Object.values(err).length > 0) disableLogin = "button-no-dimensions"

    return (
        <div className="login-container">
            <div className="login-logo-container">
                <img
                    className="login-logo"
                    src={shinanoLogoMini} />
            </div>
            <form
                className="login-form-container"
                onSubmit={handleSubmit}
            >
                <h1 className="login-form-header">
                    {formType === "new" ? "Add a product" : "Edit your product"}
                </h1>
                {/* <label>
                    SKU
                    <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSKU(e.target.value)}
                        placeholder="SKU"
                    >
                    </input>
                </label> */}
                <div className="login-form-input-contianer">
                    <label>
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setDisNameErr(true)
                        }}
                        placeholder="product name"
                    >
                    </input>
                    {disNameErr && <div className="errors">{err.name}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                            setDisPriceErr(true)
                        }}
                        placeholder="price"
                        min="0"
                        step="0.01"
                    >
                    </input>
                    {disPriceErr && <div className="errors">{err.price}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Description
                    </label>
                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value)
                            setDisDescErr(true)
                        }}
                        placeholder="description"
                    >
                    </input>
                    {disDescErr && <div className="errors">{err.desc}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Inventory
                    </label>
                    <input
                        type="number"
                        value={inventory}
                        onChange={(e) => {
                            setInventory(e.target.value)
                            setDisInventoryErr(true)
                        }}
                        placeholder="inventory"
                        min="0"
                    >
                    </input>
                    {disInventoryErr && <div className="errors">{err.inventory}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Main Image
                    </label>
                    <input
                        type="text"
                        value={mainImage}
                        onChange={(e) => {
                            setMainImage(e.target.value)
                            setDisMainImageErr(true)
                        }}
                        placeholder="Main Image URL"
                    >
                    </input>
                    {disMainImageErr && <div className="errors">{err.mainImage}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Additional Image
                    </label>
                    <input
                        type="text"
                        value={subImage1}
                        onChange={(e) => {
                            setSubImage1(e.target.value)
                            setDisSubImage1Err(true)
                        }}
                        placeholder="Additional Image URL - Optional"
                    >
                    </input>
                    {disSubImage1Err && <div className="errors">{err.subImage1}</div>}
                </div>
                <div className="login-form-input-contianer">

                    <label>
                        Additional Image
                    </label>
                    <input
                        type="text"
                        value={subImage2}
                        onChange={(e) => {
                            setSubImage2(e.target.value)
                            setDisSubImage2Err(true)
                        }}
                        placeholder="Additional Image URL - Optional"
                    >
                    </input>
                    {disSubImage2Err && <div className="errors">{err.subImage2}</div>}
                </div>
                <div className="login-form-input-contianer">
                    <label>
                        Additional Image
                    </label>
                    <input
                        type="text"
                        value={subImage3}
                        onChange={(e) => {
                            setSubImage3(e.target.value)
                            setDisSubImage3Err(true)
                        }}
                        placeholder="Additional Image URL - Optional"
                    >
                    </input>
                    {disSubImage3Err && <div className="errors">{err.subImage3}</div>}
                </div>
                <button
                    className={`login-page-button ${disableLogin}`}
                    type="submit"
                    disabled={Object.values(err).length > 0}>
                    {formType === "new" ? "Add Product" : "Edit Product"}
                </button>
            </form>
        </div>
    )
}
