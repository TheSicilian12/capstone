import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchResultsPage.css';
import '../UniversalCSS.css'

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)


    if (!products) return <div>loading search page</div>

    return (
       <div>Hello</div>
    )
}
