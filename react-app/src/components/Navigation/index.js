import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
import CartButton from '../CartButton';
import shinanoLogoMini from "../assets/Images/ShinanoLogoSmall.jpg"
import shinanoCart from "../assets/Images/Cart.jpg"

import './Navigation.css';
import '../UniversalCSS.css'
import OpenCartModal from '../OpenCartModal';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()

	const sessionUser = useSelector(state => state.session.user);
	const items = useSelector(state => state.cart.carts?.items)
	const cart = useSelector(state => state.cart)

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	// const closeMenu = () => setShowMenu(false);

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

	const cartSideBar = () => {
		openMenu()
	}


	return (
		<div className="shinano-color-background nav-container">
			<img
				className="nav-logo"
				onClick={() => history.push("/")}
				src={shinanoLogoMini} />
			<div>
				{sessionUser && cart["errors"] !== "No cart" && <CartButton cart={cart} itemNum={totalItems} />}
				{sessionUser && cart["errors"] !== "No cart" && <img
					className="nav-cart"
					onClick={cartSideBar}
					src={shinanoCart} />}
				<ul className={ulClassName} ref={ulRef}>
					<>
						<OpenCartModal closeMenu={closeMenu} />
					</>
				</ul>

				{isLoaded && <ProfileButton user={sessionUser} />}
				{!sessionUser && <h2>You must be logged in to start a cart</h2>}
				{sessionUser && cart["errors"] === "No cart" && <button onClick={addCart}>Start a cart</button>}

			</div>
		</div>
	);
}

export default Navigation;
