import React, { useState, useContext } from 'react';
import WeatherContext from '../context/WeatherContext';

const SearchForm = () => {
	const { location, setLocation } = useContext(WeatherContext);
	const [userInput, setUserInput] = useState('');

	// Handle change to seach form.
	const handleChange = (e) => {
		setUserInput(e.target.value);
	}

	// Handle submit of search form
	const handleSubmit = (e) => {
		e.preventDefault();
		if (userInput !== "") {
			setLocation({ ...location, city: userInput.split(', ')[0], state: userInput.split(', ')[1] });
			setUserInput('');
		}

	}

	return (
		<div className="search-form">
			<form onSubmit={handleSubmit}>
				<label htmlFor="search"> Search location:
                <input
						type="text"
						placeholder="City, St"
						name="search"
						value={userInput}
						onChange={(e) => handleChange(e)} /></label>
				<button className="button">Search</button>
			</form>
		</div>
	)
}

export default SearchForm;