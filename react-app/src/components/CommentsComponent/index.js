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

    console.log("comments: ", comments.length)

    // if (comments.length === 0) return null;

    // console.log("test: ", Object.values(comments))
    // comments.forEach(comment => console.log("comment: ", comment))

    return (
        <div>Hello</div>
        // <div>
        //     {Object.values(comments).map((comment) => console.log("comment: ", comment))}
        // </div>
    )
}
