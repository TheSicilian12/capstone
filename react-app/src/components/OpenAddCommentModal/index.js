import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './OpenAddCommentModal.css'
import '../UniversalCSS.css'
import StarRatingComponent from '../StarRatingComponent';
import { addProductCommentTHUNK } from '../../store/comment';


function OpenAddCommentModal({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed

    closeMenu,

    className,
    productId,
    commentInfo,
    type
}) {
    const { setModalContent, setOnModalClose } = useModal();
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState(type === "edit" ? commentInfo.details : "")
    const [disCommentErr, setDisCommentErr] = useState(false);
    const [rating, setRating] = useState(type === "edit" ? commentInfo.rating : 1)

    let err = {}
    if (comment.length < 10) err.comment = "Comment should be 10+ characters long."

    let disableLogin = "button-disabled";
    if (!Object.values(err).length > 0) disableLogin = "button-no-dimensions"

    const handleSubmit = async (e) => {
        e.preventDefault();
        // THUNK to add comment
        const payload = {
            details: comment,
            rating,
            userId: user.id,
            productId: productId
        }
        if (type === "edit") {
            const newComment = await dispatch(addProductCommentTHUNK(payload));
        } 
        closeModal();
    }

    return (
        <div className="login-container">
            <form
                className="login-form-container add-comment-form-container-border"
                onSubmit={handleSubmit}
            >
                <h1 className="login-form-header">
                    {/* {formType === "new" ? "Add a product" : "Edit your product"} */}
                    Add a comment
                </h1>
                <div className="login-form-input-contianer">
                    <StarRatingComponent rating={rating} setRating={setRating}/>
                </div>
                <div className="login-form-input-contianer">
                    <label>
                        Comment
                    </label>
                    <textarea
                        type="text"
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value)
                            setDisCommentErr(true)
                        }}
                        placeholder="comment"
                    >
                    </textarea>
                    {disCommentErr && <div className="errors">{err.comment}</div>}
                </div>
                <button
                    className={`login-page-button ${disableLogin}`}
                    type="submit"
                    disabled={Object.values(err).length > 0}
                >
                    Add comment
                    {/* {formType === "new" ? "Add Product" : "Edit Product"} */}
                </button>
            </form>
        </div>
    );
}

export default OpenAddCommentModal;
