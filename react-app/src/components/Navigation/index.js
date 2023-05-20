import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getItemsSingleCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';

import { useCart } from '../../context/CartContext';
import './Navigation.css';
import '../UniversalCSS.css'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const items = useSelector(state => state.cart?.items)
	const cartId = useSelector(state => state.cart.id)
	const dispatch = useDispatch()

	const {totalItems, setTotalItems} = useCart()

	// let itemCount
	// items ? itemCount = Object.values(items).length : itemCount = 0

	// console.log("itemCount: ",itemCount)

	// console.log("cartId: ", cartId)
	const addCart = () => {
		// console.log("add cart")
		const payload = {
			user_id: sessionUser.id,
			total_price: 0
		}
		dispatch(postCartTHUNK(payload))
	}

	const deleteCart = () => {
		// console.log("delete cart")

		dispatch(deleteCartTHUNK(sessionUser.id))
	}

	return (
		<div className="nav-background nav-container">
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
			<div>
				Shopping Cart Item Total: {totalItems}
			</div>
			<button onClick={addCart}>Start a cart</button>
			<button onClick={deleteCart}>Delete your cart</button>
		</div>
	);
}

export default Navigation;
