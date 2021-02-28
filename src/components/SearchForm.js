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
		// const state = userInput.split(', ')[1];

		if (userInput !== "") {
			getWeahter(city)
				.then(weather => {

					const weatherData = weather.data.current;
					const locationData = weather.data.location;

					if (locationData.country.toLowerCase() === "us" || locationData.country.toLowerCase() === "united states of america") {
						setLocation({ city: locationData.name, state: locationData.region });
					} else {
						setLocation({ city: locationData.name, state: locationData.country });
					}

					setWeatherData({
						temp: weatherData.temperature,
						description: weatherData.weather_descriptions[0]
					})
				})
				.catch(err => {
					alert("Invalid entry. Please enter valid city.");
					return err;
				});

			setUserInput('');
		}

	}

	return (
		<div className="search-form">
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