import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteCartTHUNK, getSingleCartTHUNK } from '../../store/cart';
import CartModalProduct from '../CartModalProduct';

import './OpenAddCommentModal.css'
import '../UniversalCSS.css'


function OpenAddCommentModal({
  modalComponent, // component to render inside the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed

  closeMenu,

  className
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch()

  const [comment, setComment] = useState("")
  const [disCommentErr, setDisCommentErr] = useState(false);

  let err = {}
  if (comment.length < 10) err.comment = "Comment should be 10+ characters long."

  return (
    <div className="login-container">
            <form
                className="login-form-container add-comment-form-container-border"
                // onSubmit={handleSubmit}
            >
                <h1 className="login-form-header">
                    {/* {formType === "new" ? "Add a product" : "Edit your product"} */}
                    Add a comment
                </h1>
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
                    // className={`login-page-button ${disableLogin}`}
                    type="submit"
                    // disabled={Object.values(err).length > 0}
                    >
                    Add comment
                    {/* {formType === "new" ? "Add Product" : "Edit Product"} */}
                </button>
            </form>
        </div>
    );
}

export default OpenAddCommentModal;
