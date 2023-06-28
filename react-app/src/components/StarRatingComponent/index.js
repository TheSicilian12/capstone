import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingComponent.css"

export default function StarRatingComponent({ groupId }) {
    const dispatch = useDispatch();

    return (
        <div>
            Hello
            <i className="fa fa-star"></i>
            <i className="far fa-star"></i>
            <i className="fa fa-star-half"></i>
        </div>
    )
}
