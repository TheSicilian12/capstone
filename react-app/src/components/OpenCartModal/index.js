import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteCartTHUNK, getSingleCartTHUNK } from '../../store/cart';
import CartModalProduct from '../CartModalProduct';

import './OpenCartModal.css'
import '../UniversalCSS.css'


function OpenCartModal({
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
  console.log("items: ", items)

  useEffect(() => {
    dispatch(getSingleCartTHUNK())
  }, [dispatch])

const onClick = () => {
  if (onModalClose) setOnModalClose(onModalClose);
  setModalContent(modalComponent);
  if (onButtonClick) onButtonClick();
};

const deleteCart = async () => {
  await dispatch(deleteCartTHUNK())
  await dispatch(getSingleCartTHUNK())
  closeMenu(true)

}

const goToCart = () => {
  history.push("/cart")
  closeMenu(true)
}

return (
  <div className="cart-modal">
    <h2 className="justify-center">Your Cart!</h2>
    <div className="cart-modal-button-container">
      <button
        className="button-no-dimensions cart-modal-button-margin"
        onClick={goToCart}>
        Go to Checkout
      </button>

      <button
        className="button-full-red cart-modal-button-margin"
        onClick={deleteCart}>
        Delete your cart
      </button>
    </div>

    {items && Object.values(items).map((item) =>
      <CartModalProduct item={item} />
    )}
  </div>
);
}

export default OpenCartModal;
