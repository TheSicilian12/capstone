import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductCommentsTHUNK } from '../../store/comment';

import "./CommentsComponent.css"

export default function CommentsComponent({groupId}) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments)

    useEffect(() => {
        dispatch(getAllProductCommentsTHUNK(groupId))
    }, [dispatch])

    let commentArr = [];
    console.log("comments: ", comments)
    // commentArr = comments;
    if (!comments) return null;

    // console.log("comments: ", comments.length)

    // if (comments.length === 0) return null;

    // console.log("test: ", Object.values(comments))
    comments.forEach(comment => console.log("comment: ", comment))

    return (
        <div>
            Comments:
            {comments.map(comment =>
            <div
                className="comment-container"
                key={comment.id}>
                    Comment: {comment.details}
            </div>)}
        </div>
    )
}
