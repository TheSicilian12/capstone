import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import ProductContainer from '../ProductContainer';
import './SearchResultsPage.css';
import '../UniversalCSS.css'
import { searchTHUNK } from '../../store/search';

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const searchProducts = useSelector(state => state.search.searchProducts)
    const user = useSelector(state => state.session.user)

    const parameter = useParams().param

    useEffect(() => {
        dispatch(searchTHUNK(parameter))
    }, [parameter, dispatch])

    if (searchProducts === "no products found") return <div>no matches</div>
    if (!searchProducts) return <div>loading search page</div>

    return (
        <div className="justify-center search-results-page">
            <div>
                {Object.values(searchProducts).map(product => {
                    return (
                        <div className="" key={product.id}>
                            <ProductContainer product={product} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
