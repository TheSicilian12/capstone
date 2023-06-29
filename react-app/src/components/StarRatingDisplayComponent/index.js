import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingDisplayComponent.css"
import { getAllProductCommentsTHUNK } from '../../store/comment';

export default function StarRatingDisplayComponent({productId}) {
    const dispatch = useDispatch();

    const comments = useSelector(state => state.comments.comments)
    const singleProduct = useSelector(state => state.products.product)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllProductCommentsTHUNK(productId))
    }, [dispatch])

    const fullStar = "fa fa-star star-color";
    const emptyStar = "far fa-star";
    const halfStar = "fa fa-star-half";

    // fullStar = <i className="fa fa-star"></i>;
    // emptyStar =  <i className="far fa-star"></i>;
    // halfStar = <i className="fa fa-star-half"></i>


    return (
        <div className="star-create-rating-component">
           <div>
                <i className={fullStar}></i>
           </div>
           {/* <div>
                <i className={rating >= 2 ? fullStar : emptyStar}></i>
           </div>
           <div>
                <i className={rating >= 3 ? fullStar : emptyStar}></i>
           </div>
           <div>
                <i className={rating >=4 ? fullStar : emptyStar}></i>
           </div>
           <div>
                <i className={rating >= 5 ? fullStar : emptyStar}></i>
           </div> */}



        </div>
    )
}
