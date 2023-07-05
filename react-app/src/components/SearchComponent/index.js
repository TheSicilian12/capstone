import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleCartTHUNK, postCartTHUNK } from '../../store/cart';

import './SearchComponent.css';
import '../UniversalCSS.css'
import OpenCartModal from '../OpenCartModal';
import { searchTHUNK } from '../../store/search';

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

		if (searchData.length === 0) history.push('/');
		else {
			dispatch(searchTHUNK(searchData));
			history.push(`/search/${searchData}`)
		}
	}

	return (
		<div>
			<input
				className="search-component-input"
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
				className="search-component-button"
				onClick={handleSubmit}
			>
				<i className="fa fa-search"></i>
			</button>
		</div>
	);
}

export default SearchComponent;
