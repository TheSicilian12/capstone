import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./StarRatingProductDisplayComponent.css"
import { getAllProductCommentsTHUNK } from '../../store/comment';

export default function StarRatingProductDisplayComponent({productId}) {
    const dispatch = useDispatch();

    const comments = useSelector(state => state.comments.comments)
    const singleProduct = useSelector(state => state.products.product)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllProductCommentsTHUNK(productId))
    }, [dispatch])

//     console.log("comments: ", comments)

    let totalComments = 0;
    let totalRatings = 0;
    let ratingTotal = 0;
    if (comments) {
     totalComments = comments.length
     // console.log("comment length: ", comments.length)

     comments.forEach(comment => {
          // console.log("comment: ", comment.rating)
          totalRatings += comment.rating
          // console.log("totalRatings: ", totalRatings)
     })
    }

//     console.log("review: totalComments: ", totalComments)
//     console.log("review: totalRatings: ", totalRatings)

    if (totalComments > 0) {
     // One decimal place
         ratingTotal = Number(totalRatings / totalComments).toFixed(1)
     //     console.log("rating total: ", ratingTotal)
    }

//     console.log("ratingTotal: ", ratingTotal)


    const fullStar = "fa fa-star star-color";
    const emptyStar = "far fa-star star-color";
    const halfStar = "fa fa-star-half star-color";

    // fullStar = <i className="fa fa-star"></i>;
    // emptyStar =  <i className="far fa-star"></i>;
    // halfStar = <i className="fa fa-star-half"></i>

    return (
        <div className="star-create-rating-component">
          rating total: {ratingTotal}
          {/* first star */}
           <div>
                <i className={fullStar}></i>
           </div>

          {/* second star */}
          {ratingTotal >= 1.5 && ratingTotal < 2 ?
           ratingTotal >= 1.5 && ratingTotal < 2 && <div>
                <i className={halfStar}></i>
           </div> :
           <div>
                <i className={ratingTotal >= 2 ? fullStar : emptyStar}></i>
           </div>}

           {/* third star */}
           {ratingTotal >= 2.5 && ratingTotal < 3 ?
           <div>
                <i className={halfStar}></i>
           </div> :
           <div>
                <i className={ratingTotal >= 3 ? fullStar : emptyStar}></i>
           </div>}

          {/* fourth star */}
          {ratingTotal >= 3.5 && ratingTotal < 4 ?
          <div>
                <i className={halfStar}></i>
           </div> :
           <div>
                <i className={ratingTotal >=4 ? fullStar : emptyStar}></i>
           </div>}

           {/* fifth star */}
           {ratingTotal >= 4.5 && ratingTotal < 5 ?
           <div>
                <i className={halfStar}></i>
           </div> :
           <div>
                <i className={ratingTotal >= 5 ? fullStar : emptyStar}></i>
           </div>}



        </div>
    )
}
