import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProductTHUNK } from '../../store/product';

import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm() {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    const [sku, setSKU] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [inventory, setInventory] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (sku && name && price && desc && inventory) {
            const payload = {
                SKU: sku,
                name,
                price,
                desc: desc,
                inventory,
                owner_id: user.id
            }

            // Error if SKU already exists for a product
            const createProduct = await dispatch(postProductTHUNK(payload))
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
