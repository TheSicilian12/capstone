import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
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
			// setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	// let cartCheck = false;

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

	const closeMenu = () => setShowMenu(false);

	const cartSideBar = () => {
		openMenu()
	}

	return (
		<div className="shinano-color-background nav-container">
			<img
				alt = "Shinano cart logo"
				className="nav-logo"
				onClick={() => history.push("/")}
				src={shinanoLogoMini} />

			<div className="nav-prof-cart-container">

					{isLoaded &&
						<ProfileButton user={sessionUser} />
					}

				{sessionUser && cart["errors"] !== "No cart" && <div onClick={cartSideBar} className="cart-item-num nav-bar-cart-item-container cart-hover">
					<img
						alt = "Shinano cart logo"
						className="nav-cart"
						src={shinanoCart} />
					<div>
						{totalItems}
					</div>
				</div>}

				<ul className={ulClassName} ref={ulRef}>
					<>
						<OpenCartModal closeMenu={closeMenu} />
					</>
				</ul>

				{!sessionUser && <p onClick={() => history.push("/login")} className="nav-bar-signed-out-text">Sign In and Start Shop</p>}
				{sessionUser && cart["errors"] === "No cart" && <button className="nav-bar-start-cart-button" onClick={addCart}>Start a cart</button>}

			</div>
		</div>
	);
}

export default Navigation;
