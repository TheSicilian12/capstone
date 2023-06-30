import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductCommentsTHUNK } from '../../store/comment';

import "./CommentsComponent.css"
import OpenModalButton from '../OpenModalButton';
import OpenAddCommentModal from '../OpenAddCommentModal';
import OpenEditCommentModal from '../OpenEditCommentModal';
import OpenDeleteCommentModal from '../OpenDeleteCommentModal';
import StarRatingCommentDisplayComponent from '../StarRatingCommentDisplayComponent';

export default function CommentsComponent({ productId }) {
    const dispatch = useDispatch();

    const comments = useSelector(state => state.comments.comments)
    const singleProduct = useSelector(state => state.products.product)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllProductCommentsTHUNK(productId))
    }, [dispatch])

    if (!comments) return null;

    console.log("singleProduct: ", singleProduct)

    return (
        <div className="comment-component-container">
            <h2>
                Comments:
            </h2>
            {user && user.id !== singleProduct.ownerId && <OpenModalButton
                className="button-no-dimensions comment-add-comment-width"
                buttonText="Add Comment"
                modalComponent={<OpenAddCommentModal type={"new"} productId={singleProduct.id} />}
            />}
            {comments.map(comment =>
                <div
                    className=""
                    key={`indComment${comment.id}`}>
                    <div
                        key={`username${comment.id}`}>
                        {comment.user.username}
                    </div>
                    <StarRatingCommentDisplayComponent rating={comment.rating} />
                    <div
                        className="comment-container"
                        key={`comment${comment.id}`}>
                        {comment.details}
                    </div>
                    {user && user.id === comment.userId && <div className="comment-buttons">
                        <OpenModalButton
                            className="comment-buttons-margin button-no-dimensions"
                            buttonText="Edit Comment"
                            modalComponent={<OpenEditCommentModal comment={comment} />}
                        />
                        <OpenModalButton
                            className="comment-buttons-margin button-no-dimensions"
                            buttonText="Delete Comment"
                            modalComponent={<OpenDeleteCommentModal comment={comment} />}
                        />
                    </div>}
                </div>)}
        </div>
    )
}
