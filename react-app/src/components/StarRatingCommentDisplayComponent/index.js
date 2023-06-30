import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingCommentDisplayComponent.css"
import { getAllProductCommentsTHUNK } from '../../store/comment';

export default function StarRatingCommentDisplayComponent({rating}) {
    const dispatch = useDispatch();

    const fullStar = "fa fa-star star-color";
    const emptyStar = "far fa-star star-color";

    return (
        <div className="star-create-rating-component">
          rating total: {rating}
          {/* first star */}
           <div>
                <i className={fullStar}></i>
           </div>

          {/* second star */}
           <div>
                <i className={rating >= 2 ? fullStar : emptyStar}></i>
           </div>

           {/* third star */}
           <div>
                <i className={rating >= 3 ? fullStar : emptyStar}></i>
           </div>

          {/* fourth star */}
           <div>
                <i className={rating >=4 ? fullStar : emptyStar}></i>
           </div>

           {/* fifth star */}
           <div>
                <i className={rating >= 5 ? fullStar : emptyStar}></i>
           </div>
        </div>
    )
}
