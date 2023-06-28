import React from 'react';
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
  const history = useHistory()
  const items = useSelector(state => state.cart.carts?.items)
  const cartAdj = useSelector(state => state.cart)

  return (
    <div>Hello</div>
    );
}

export default OpenAddCommentModal;
