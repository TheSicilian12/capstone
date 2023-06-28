import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingComponent.css"

export default function StarRatingComponent() {
    const dispatch = useDispatch();

    const [rating, setRating] = useState(1)

    const fullStar = "fa fa-star star-color";
    const emptyStar = "far fa-star";

    // fullStar = <i className="fa fa-star"></i>;
    // emptyStar =  <i className="far fa-star"></i>;
    // halfStar = <i className="fa fa-star-half"></i>
    console.log("rating: ", rating)
    return (
        <div className="star-create-rating-component">
           <div
                onMouseEnter={() => setRating(1)}
            >
                <i className={fullStar}></i>
           </div>
           <div
                onMouseEnter={() => setRating(2)}
            >
                <i className={rating >= 2 ? fullStar : emptyStar}></i>
           </div>
           <div
                onMouseEnter={() => setRating(3)}
            >
                <i className={rating >= 3 ? fullStar : emptyStar}></i>
           </div>
           <div
                onMouseEnter={() => setRating(4)}
            >
                <i className={rating >=4 ? fullStar : emptyStar}></i>
           </div>
           <div
                onMouseEnter={() => setRating(5)}
            >
                <i className={rating >= 5 ? fullStar : emptyStar}></i>
           </div>



        </div>
    )
}
