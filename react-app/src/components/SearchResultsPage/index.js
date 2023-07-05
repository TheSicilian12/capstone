import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ProductContainer from '../ProductContainer';
import './SearchResultsPage.css';
import '../UniversalCSS.css'

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const searchProducts = useSelector(state => state.search.searchProducts)
    const user = useSelector(state => state.session.user)

    if (!searchProducts) return <div>loading search page</div>

    console.log("search products: ", searchProducts)

    // The actual url needs to change for the search and that's what is searched so a refresh won't be a problem

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
