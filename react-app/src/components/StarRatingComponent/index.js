import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingComponent.css"

export default function StarRatingComponent() {
    const dispatch = useDispatch();

    const [rating, setRating] = useState(1)

    const fullStar = "fa fa-star";
    const emptyStar = "far fa-star";

    // fullStar = <i className="fa fa-star"></i>;
    // emptyStar =  <i className="far fa-star"></i>;
    // halfStar = <i className="fa fa-star-half"></i>

    return (
        <div>
            Hello



        </div>
    )
}
