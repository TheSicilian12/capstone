import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
import CartButton from '../CartButton';

import './Navigation.css';
import '../UniversalCSS.css'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const items = useSelector(state => state.cart.carts?.items)
	const cart = useSelector(state => state.cart)
	const dispatch = useDispatch()
	const [showMenu, setShowMenu] = useState(false);

	let totalItems = 0;
	if (items) {
		console.log("items: ", Object.keys(items).length)
		totalItems = Object.keys(items).length
	}

	const addCart = () => {
		// console.log("add cart")
		const payload = {
			user_id: sessionUser.id,
			total_price: 0,
			product_ids: []
		}
		dispatch(postCartTHUNK(payload))
		dispatch(getSingleCartTHUNK())
	}

	const deleteCart = () => {
		dispatch(deleteCartTHUNK())
		dispatch(getSingleCartTHUNK())
	}

	const closeMenu = () => setShowMenu(false);

	return (
		<div className="nav-background nav-container">
			<ul>
				<li>
					<NavLink exact to="/homepage">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
			<div>
				Shopping Cart Item Total: {totalItems ? totalItems : 0}
			</div>
			<button onClick={addCart}>Start a cart</button>
		 	<button onClick={deleteCart}>Delete your cart</button>
			 <CartButton cart={cart}/>
		</div>
	);
}

export default Navigation;
