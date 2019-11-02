import React from 'react';
import '../App.css';
import SearchForm from './SearchForm';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="flex-container header-wrapper">
                    <div className="logo">logo</div>
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