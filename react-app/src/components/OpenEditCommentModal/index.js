import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './OpenEditCommentModal.css'
import '../UniversalCSS.css'
import StarRatingComponent from '../StarRatingComponent';
import { addProductCommentTHUNK } from '../../store/comment';
import OpenAddCommentModal from '../OpenAddCommentModal';


function OpenEditCommentModal({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed

    closeMenu,

    className,
    comment
}) {
    // Get comment info and feed it to add comment modal
    // Add comment modal will then need to parse depending on if it's an edit or new

    console.log("comment: ", comment)
    return (
        <div>
            <OpenAddCommentModal commentInfo={comment} type={"edit"}/>
        </div>
    );
}

export default OpenEditCommentModal;
