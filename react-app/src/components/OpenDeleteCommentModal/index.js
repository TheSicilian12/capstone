import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './OpenDeleteCommentModal.css'
import '../UniversalCSS.css'
import StarRatingComponent from '../StarRatingComponent';
import commentReducer, { addProductCommentTHUNK, deleteProductCommentTHUNK } from '../../store/comment';

function OpenDeleteCommentModal({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed

    closeMenu,

    className,
    comment
}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHandler = () => {
        dispatch(deleteProductCommentTHUNK(comment));
        closeModal();
    }

    console.log("comment: ", comment)

    return (
        <div>
            <div>
                Delete comment
            </div>
            <div>
                {comment.details}
            </div>
            <button
                onClick={() => deleteHandler()}
            >
                Yes
            </button>
            <button
                onClick={closeModal}
            >
                No
            </button>
        </div>
    );
}

export default OpenDeleteCommentModal;
