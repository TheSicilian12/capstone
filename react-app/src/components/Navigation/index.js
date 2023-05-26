import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
import CartButton from '../CartButton';
import shinanoLogoMini from "../assets/Images/ShinanoLogoSmall.jpg"

import './Navigation.css';
import '../UniversalCSS.css'

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()

	const sessionUser = useSelector(state => state.session.user);
	const items = useSelector(state => state.cart.carts?.items)
	const cart = useSelector(state => state.cart)

	const [showMenu, setShowMenu] = useState(false);

	let cartCheck = false;
	// if (cart.carts.items === undefined) cartCheck = true
	// console.log("cart: ", cart)
	// console.log("cart errors: ", cart["errors"])
	// console.log("display start a cart button", cart["errors"] === "No cart")
	// console.log("display cart button", cart["errors"] !== "No cart")

	let totalItems = 0;
	if (items) {
		totalItems = Object.keys(items).length
	}

	const addCart = () => {
		const payload = {
			user_id: sessionUser.id,
			total_price: 0,
			product_ids: []
		}
		dispatch(postCartTHUNK(payload))
		dispatch(getSingleCartTHUNK())
	}

	// const deleteCart = () => {
	// 	dispatch(deleteCartTHUNK())
	// 	dispatch(getSingleCartTHUNK())
	// }

	const closeMenu = () => setShowMenu(false);

	return (
		<div className="shinano-color-background nav-container">
			<ul>
					<img
						width={"150px"}
						onClick={() => history.push("/")}
						src={shinanoLogoMini}/>
			</ul>
		 	<div>
				{isLoaded && <ProfileButton user={sessionUser} />}
				{!sessionUser && <h2>You must be logged in to start a cart</h2>}
				{sessionUser && cart["errors"] === "No cart" && <button onClick={addCart}>Start a cart</button>}
				{sessionUser && cart["errors"] !== "No cart" && <CartButton cart={cart} itemNum={totalItems}/>}
			</div>
		</div>
	);
}

export default Navigation;
