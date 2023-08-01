import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<h2 className='home-icon'>
				<NavLink className='home-icon' exact to="/home"><i className='fas fa-home'></i> Home</NavLink>
			</h2>
			<h2>
				<NavLink className='home-icon' exact to="/collection"><i className='fas fa-music'></i> Library</NavLink>
			</h2>
			{isLoaded && (
				<h2>
					<ProfileButton user={sessionUser} />
				</h2>
			)}
		</div>
	);
}

export default Navigation;
