import React from 'react';
import SearchForm from './SearchForm';
import logo from '../images/weather.png';

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__logo"><img src={logo} alt="weather app" /></div>
					<nav className="header__nav">
						<SearchForm />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header;