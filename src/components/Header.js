import React from 'react';
import SearchForm from './SearchForm';
import logo from '../images/weather.png';

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="flex-container header__wrapper">
					<div className="header__logo"><img src={logo} alt="weather app" /></div>
					<nav>
						<ul className="flex-container">
							{/* <li><a href="#">Your Location</a></li> */}
							{/* <li><a href="#saved-locations">Saved Location</a></li> */}
						</ul>
						<SearchForm />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header;