import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './OpenDeleteCommentModal.css'
import '../UniversalCSS.css'
import StarRatingComponent from '../StarRatingComponent';
import { addProductCommentTHUNK } from '../../store/comment';


function OpenDeleteCommentModal({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed

    closeMenu,

    className,
    productId
}) {


    return (
        <div>
            Delete comment
        </div>
    );
}

export default OpenDeleteCommentModal;
