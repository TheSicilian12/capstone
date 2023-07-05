import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';

import './SearchComponent.css';
import '../UniversalCSS.css'
import OpenCartModal from '../OpenCartModal';
import { searchProductTHUNK } from '../../store/product';

function SearchComponent({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	const [showMenu, setShowMenu] = useState(false);
	const [searchData, setSearchData] = useState("")

	const ulRef = useRef();

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	const closeMenu = () => setShowMenu(false);

	const handleSubmit = () => {
		console.log("search: ", searchData);
		dispatch(searchProductTHUNK(searchData));

	}

	return (
		<div>
			<input
				type="text"
				placeholder="Search Shinano"
				value={searchData}
				onChange={(e) => {
					setSearchData(e.target.value)
				}}
				onKeyPress={event => {
					if (event.key === 'Enter') {
						handleSubmit()
					}
				}}
			/>
			<button
				onClick={handleSubmit}
			>
				<i class="fa fa-search"></i>
			</button>
		</div>
	);
}

export default SearchComponent;
