import React from 'react';
import '../App.css';
import SearchForm from './SearchForm';
import logo from '../images/weather.png';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="flex-container header-wrapper">
                    <div className="logo"><img src={logo} /></div>
                    <nav>
                        <ul className="flex-container">
                            <li><a href="#">Your Location</a></li>
                            <li><a href="#">Saved Location</a></li>
                            <SearchForm />
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;