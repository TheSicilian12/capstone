import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {editProductTHUNK, postProductTHUNK } from '../../store/product';


import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm({productInfo, formType, productId, mainProductImage, imageArray}) {
    // console.log("productInfo: ", productInfo ? productInfo.SKU : "test")
    console.log("formType: ", formType)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    const [sku, setSKU] = useState(productInfo ? productInfo.SKU : "");
    const [name, setName] = useState(productInfo ? productInfo.name : "");
    const [price, setPrice] = useState(productInfo ? productInfo.price : "");
    const [desc, setDesc] = useState(productInfo ? productInfo.desc : "");
    const [inventory, setInventory] = useState(productInfo ? productInfo.inventory : "");
    const [mainImage, setMainImage] = useState(mainProductImage ? mainProductImage.image_url : "");
    const [subImage1, setSubImage1] = useState(imageArray && imageArray[0] ? imageArray[0].image_url : "");
    const [subImage2, setSubImage2] = useState(imageArray && imageArray[1] ? imageArray[1].image_url : "");
    const [subImage3, setSubImage3] = useState(imageArray && imageArray[2] ? imageArray[2].image_url : "");


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("add product")


        if (sku && name && price && desc && inventory && mainImage) {
            let payload = {
                SKU: sku,
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
            if (formType === "edit" && imageArray[0] && !subImage1) {
                console.log("subImage1 if statement")
                imageHolder.deleteImg = "delete"
            } else imageHolder.deleteImg = "no"

            payload.images.push(imageHolder)


            imageHolder = {}
            imageHolder.image_url = subImage2
            imageHolder.main_image = "no"
            if (formType === "edit" && imageArray[1]) imageHolder.image_id = imageArray[1].id
            if (formType === "edit" && imageArray[1] && !subImage2) {
                imageHolder.deleteImg = "delete"
            } else imageHolder.deleteImg = "no"

            payload.images.push(imageHolder)

            console.log("subImg 2: ", imageHolder.delete)


            imageHolder = {}
            imageHolder.image_url = subImage3
            imageHolder.main_image = "no"
            if (formType === "edit" && imageArray[2]) imageHolder.image_id = imageArray[2].id
            if (formType === "edit" && imageArray[2] && !subImage3) {
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
                // history.push(`/products/${data.product.id}`)
            }
        } else {
            return console.log("ERROR In ADD / EDIT a produact")
        }

        console.log('submit button')
    }

    return (
        <div>
            Product Form
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    SKU
                    <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSKU(e.target.value)}
                        placeholder="SKU"
                    >
                    </input>
                </label>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="product name"
                    >
                    </input>
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="price"
                        min="0"
                        step="0.01"
                    >
                    </input>
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="description"
                    >
                    </input>
                </label>

                <label>
                    Inventory
                    <input
                        type="number"
                        value={inventory}
                        onChange={(e) => setInventory(e.target.value)}
                        placeholder="inventory"
                        min="0"
                    >
                    </input>
                </label>

                <label>
                    Main Image
                    <input
                        type="text"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        placeholder="Main Image URL"
                    >
                    </input>
                </label>
                <label>
                    Additional Image
                    <input
                        type="text"
                        value={subImage1}
                        onChange={(e) => setSubImage1(e.target.value)}
                        placeholder="Additional Image URL"
                    >
                    </input>
                </label>
                <label>
                    Additional Image
                    <input
                        type="text"
                        value={subImage2}
                        onChange={(e) => setSubImage2(e.target.value)}
                        placeholder="Additional Image URL"
                    >
                    </input>
                </label>
                <label>
                    Additional Image
                    <input
                        type="text"
                        value={subImage3}
                        onChange={(e) => setSubImage3(e.target.value)}
                        placeholder="Additional Image URL"
                    >
                    </input>
                </label>
                <button type="submit">
                    Product
                </button>
            </form>
        </div>
    )
}
