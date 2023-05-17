import { useState } from 'react';

import './GroupForm.css'
import '../UniversalCSS.css'


export default function ProductForm() {
    const [sku, setSKU] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    return (
        <div>
            Product Form
            <form>
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
            </form>
        </div>
    )
}
