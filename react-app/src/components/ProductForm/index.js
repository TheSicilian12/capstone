import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { editProductTHUNK, postProductTHUNK } from '../../store/product';


import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm({productInfo, formType, productId}) {
    // console.log("productInfo: ", productInfo ? productInfo.SKU : "test")
    console.log("edit: ", formType)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    const [sku, setSKU] = useState(productInfo ? productInfo.SKU : "");
    const [name, setName] = useState(productInfo ? productInfo.name : "");
    const [price, setPrice] = useState(productInfo ? productInfo.price : "");
    const [desc, setDesc] = useState(productInfo ? productInfo.desc : "");
    const [inventory, setInventory] = useState(productInfo ? productInfo.inventory : "");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (sku && name && price && desc && inventory) {
            let payload = {
                SKU: sku,
                name,
                price,
                desc,
                inventory,
                owner_id: user.id
            }

            let data
            if (formType === "new") {
                data = await dispatch(postProductTHUNK(payload))
            }
            // console.log("createProduct: ", createProduct)
            if (formType === "edit") {
                payload.productId = productId
                data = await dispatch(editProductTHUNK(payload))
            }

            if (data) {
                // console.log(createProduct.product.id)
                history.push(`/products/${data.product.id}`)
            }
        } else {
            return console.log("ERROR")
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

                <button type="submit">
                    Product
                </button>
            </form>
        </div>
    )
}
