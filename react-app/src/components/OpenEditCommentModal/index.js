import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './OpenEditCommentModal.css'
import '../UniversalCSS.css'
import StarRatingComponent from '../StarRatingComponent';
import { addProductCommentTHUNK } from '../../store/comment';


function OpenEditCommentModal({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed

    closeMenu,

    className,
    productId
}) {


    return (
        <div>
            Edit comment
        </div>
    );
}

export default OpenEditCommentModal;
