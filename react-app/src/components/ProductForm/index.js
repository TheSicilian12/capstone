import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {editProductTHUNK, postProductTHUNK } from '../../store/product';


import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm({productInfo, formType, productId}) {
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
    const [mainImage, setMainImage] = useState("");
    const [subImage1, setSubImage1] = useState("");
    const [subImage2, setSubImage2] = useState("");
    const [subImage3, setSubImage3] = useState("");


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
                // main_image: mainImage,
                // subImages: [],
                images: [], //images is a list of dictionaries for mass upload
                owner_id: user.id
            }

            payload.images.push({
                image_url: mainImage,
                main_image: "yes"
            })

            if (subImage1) {
                payload.images.push({
                    image_url: subImage1,
                    main_image: "no"
                })
            }

            if (subImage2) {
                payload.images.push({
                    image_url: subImage2,
                    main_image: "no"
                })
            }

            if (subImage3) {
                payload.images.push({
                    image_url: subImage3,
                    main_image: "no"
                })
            }

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
