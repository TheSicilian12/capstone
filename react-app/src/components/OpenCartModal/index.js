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
  const cartAdj = useSelector(state => state.cart)
  // console.log("items: ", items)

  const singleCart = cartAdj.carts

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

  let noItems = true
  if (singleCart?.items) noItems = false
  // if (!singleCart?.items) return (<div>loading</div>)

  let itemCart = {}
  let subTotal = 0;

  if (!noItems) {
    if (Object.values(singleCart.items).length === 0) console.log("test")
  console.log("singleCart: ", singleCart)
  for (let e of Object.values(singleCart.items)) {
    console.log("e: ", e)
    console.log("key check: ", itemCart[e.item.id])
    subTotal += e.item.price
    if (!itemCart[e.item.id]) {
      itemCart[e.item.id] = { quantity: 1, item: e.item, mainImage: e.mainImage.image_url }
    } else {
      itemCart[e.item.id].quantity += 1;
    }
  }
}

  return (
    <div className="cart-modal" onClick={(e) => e.preventDefault}>
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

      {items && Object.values(itemCart).map((item) =>
        <CartModalProduct item={item} />
      )}
    </div>
  );
}

export default OpenCartModal;
