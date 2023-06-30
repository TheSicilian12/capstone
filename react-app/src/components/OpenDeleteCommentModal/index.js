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

    return (
        <div className="delete-comment-modal-container">
            <div>
                <h1>
                    Delete comment
                </h1>
                <div className="delete-comment-text-container">
                    {comment.details}
                </div>
            </div>
            <div className="delete-comment-buttons-container">
                <button
                    className="button-small"
                    onClick={() => deleteHandler()}
                >
                    Yes
                </button>
                <button
                    className="button-small"
                    onClick={closeModal}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default OpenDeleteCommentModal;
