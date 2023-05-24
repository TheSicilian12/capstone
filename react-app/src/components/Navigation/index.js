import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';

import './Navigation.css';
import '../UniversalCSS.css'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const items = useSelector(state => state.cart.carts?.items)
	// const cartId = useSelector(state => state.cart.id)
	const dispatch = useDispatch()

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
		// dispatch(getSingleCartTHUNK())
	}

	const deleteCart = () => {
		console.log("delete cart")
		dispatch(deleteCartTHUNK())
		dispatch(getSingleCartTHUNK())
	}

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
		</div>
	);
}

export default Navigation;
