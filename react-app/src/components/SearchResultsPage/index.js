import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductContainer from '../ProductContainer';
import './SearchResultsPage.css';
import '../UniversalCSS.css'

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const searchProducts = useSelector(state => state.search.searchProducts)
    const user = useSelector(state => state.session.user)

    if (!searchProducts) return <div>loading search page</div>

    console.log("search products: ", searchProducts)

    return (
        <div>
            <div>Hello</div>
            {Object.values(searchProducts).map(product => {
                return (
                    <div className="" key={product.id}>
                    <ProductContainer product={product} />
                </div>
                )
            })}
        </div>
    )
}
