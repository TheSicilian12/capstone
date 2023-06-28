import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductCommentsTHUNK } from '../../store/comment';

import "./CommentsComponent.css"
import OpenModalButton from '../OpenModalButton';
import OpenAddCommentModal from '../OpenAddCommentModal';
import OpenEditCommentModal from '../OpenEditCommentModal';
import OpenDeleteCommentModal from '../OpenDeleteCommentModal';

export default function CommentsComponent({ groupId }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments)
    const singleProduct = useSelector(state => state.products.product)

    useEffect(() => {
        dispatch(getAllProductCommentsTHUNK(groupId))
    }, [dispatch])


    let commentArr = [];
    // commentArr = comments;
    if (!comments) return null;

    // if (comments.length === 0) return null;

    return (
        <div>
            Comments:
            <OpenModalButton
                buttonText="Add Comment"
                modalComponent={<OpenAddCommentModal productId={singleProduct.id} />}
            />
            {comments.map(comment =>
                <div
                    key={`indComment${comment.id}`}>
                    <div
                        key={`username${comment.id}`}>
                        {comment.user.username}
                    </div>
                    <div
                        className="comment-container"
                        key={`comment${comment.id}`}>
                        Comment: {comment.details}
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText="Edit Comment"
                            modalComponent={<OpenEditCommentModal comment={comment}/>}
                        />
                        <OpenModalButton
                            buttonText="Delete Comment"
                            modalComponent={<OpenDeleteCommentModal />}
                        />
                    </div>
                </div>)}
        </div>
    )
}
