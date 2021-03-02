import React, { useState, useContext } from 'react';
import WeatherContext from '../context/WeatherContext';
import { getWeahter } from "../api/api";

const SearchForm = () => {
	const { setLocation, setWeatherData } = useContext(WeatherContext);
	const [userInput, setUserInput] = useState('');

	// Handle change to seach form.
	const handleChange = (e) => {
		setUserInput(e.target.value);
	}

	// Handle submit of search form
	const handleSubmit = (e) => {
		e.preventDefault();

		const city = userInput.split(', ')[0];
		const state = userInput.split(', ')[1] || "";

		if (userInput !== "") {
			getWeahter(city, state)
				.then(weather => {

					const data = weather.data.data[0];
					let city, state;

					if (data.country_code.toLowerCase() === "us") {
						city = data.city_name;
						state = data.state_code;
					} else {
						city = data.city_name;
						state = data.country_code;
					}

					setLocation({ city, state });

					setWeatherData({
						temp: data.temp,
						description: data.weather.description
					});
				})
				.catch(err => {
					alert("Invalid entry. Please enter valid city.");
				});

			setUserInput('');
		}

	}

	return (
		<div className="search-form">
			<span className="help-icon"><i className="far fa-question-circle"></i></span>
			<form onSubmit={handleSubmit}>
				<label htmlFor="search"> Search location:</label>
				<input
					type="text"
					placeholder="City, St"
					name="search"
					value={userInput}
					onChange={(e) => handleChange(e)} />
				<button className="button">Search</button>
			</form>
		</div>
	)
}

export default SearchForm;