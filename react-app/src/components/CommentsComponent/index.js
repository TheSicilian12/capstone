import React from 'react';

import "./CommentsComponent.css"

export default function CommentsComponent({comments}) {
    console.log("comments: ", comments)


    return (

        <div>
            {Object.values(comments).map((comment) => <div key={comment.id}>Comment: {comment.details}</div>)}
        </div>
    )
}
