import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getSingleCartTHUNK } from '../../store/cart';
import CartModalProduct from '../CartModalProduct';

import './OpenCartModal.css'
import '../UniversalCSS.css'


function OpenCartModal({
  modalComponent, // component to render inside the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed

  className
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.carts?.items)

  useEffect(() => {
    dispatch(getSingleCartTHUNK())
  }, [dispatch])

  if (items) console.log("items: ", Object.values(items).forEach(item => {
    console.log("hello!!!!!!!!!")
  }))

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className="cart-modal">
      Hello

      {items && <div>hello</div>}
      {items && Object.values(items).map((item) => (
        <CartModalProduct item={item}/>
      ))}




    </div>
  );
}

export default OpenCartModal;
