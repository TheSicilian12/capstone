import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';

import './SearchComponent.css';
import '../UniversalCSS.css'
import OpenCartModal from '../OpenCartModal';

function SearchComponent({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	const [showMenu, setShowMenu] = useState(false);
	const [searchData, setSearchData] = useState("")

	const ulRef = useRef();

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	const closeMenu = () => setShowMenu(false);

	return (
		<div>
			<input
				type="text"
				placeholder="search for items..."
				value={searchData}
				onChange={(e) => {
					setSearchData(e.target.value)
				}}
			/>

		</div>
	);
}

export default SearchComponent;
