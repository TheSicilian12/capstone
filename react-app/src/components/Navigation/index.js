import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { deleteCartTHUNK, getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';
import './Navigation.css';
import '../UniversalCSS.css'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const cartId = useSelector(state => state.cart.id)

	console.log("cartId: ", cartId)
	const addCart = () => {
		console.log("add cart")
		const payload = {
			user_id: sessionUser.id,
			total_price: 0
		}

		dispatch(postCartTHUNK(payload))
	}

	const deleteCart = () => {
		console.log("delete cart")

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
				Shopping Cart Item Total:
			</div>
			<button onClick={addCart}>Start a cart</button>
			<button onClick={deleteCart}>Delete your cart</button>
		</div>
	);
}

export default Navigation;
