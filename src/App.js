import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import DateTime from './components/DateTime';
import MainLocation from './components/MainLocation';
import WeatherContext from './context/WeatherContext';

const App = () => {
	// const [savedLocations, setSavedLocations] = useState([]);
	const [location, setLocation] = useState({
		city: '',
		state: ''
	});

	// // Save the location and add to collection of saved locations.
	// const saveLocation = (location) => {
	// 	setSavedLocations([...savedLocations, location]);
	// }

	// // Save locations to local storage if there are any saved.
	// if (savedLocations.length > 0) {
	// 	localStorage.setItem('savedLocation', JSON.stringify(savedLocations));
	// }

	return (
		<WeatherContext.Provider value={{ location, setLocation }}>
			<Header />
			<DateTime />
			<MainLocation />
		</WeatherContext.Provider>
	);
}

export default App;
