import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css';
import '../UniversalCSS.css'
import { getAllProductsTHUNK } from '../../store/product';
import { getSingleCartTHUNK } from '../../store/cart';
import ProductContainer from '../ProductContainer';
import MainCarousel from '../MainCarousel';

export default function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    // const items = useSelector(state => state.cart.carts.items)

    useEffect(() => {
        dispatch(getAllProductsTHUNK())
        if (user) dispatch(getSingleCartTHUNK())
    }, [dispatch, user])

    if (!products) return <div>loading homepage</div>

    return (
        <>
            <div className="justify-center home-page">
                <MainCarousel />
                <div className="homepage-container">
                    {Object.values(products).map(product => {
                        return (
                            <div className="homepage-margin-product" key={product.id}>
                                <ProductContainer product={product} />
                            </div>
                        )
                    })}
                </div>
                <div className="homepage-footer">
                    <div className="homepage-footer-item-container">
                        <a className="text-underline-none homepage-footer-item" href={"https://www.linkedin.com/in/michael-guidera-376214260/"} target="_blank" rel="noreferrer">Michael Guidera</a>
                        <a className="text-underline-none homepage-footer-item" href={"https://github.com/TheSicilian12/capstone"} target="_blank" rel="noreferrer">Shinano Repository</a>
                    </div>
                </div>
            </div>
        </>
    )


}
