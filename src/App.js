import React, { useState, useEffect } from 'react';
import "./styles/styles.scss";
import Header from './components/Header';
import DateTime from './components/DateTime';
import MainLocation from './components/MainLocation';
import SavedLocationsList from "./components/SavedLocationsList";
import WeatherContext from './context/WeatherContext';

const App = () => {
	const [savedLocations, setSavedLocations] = useState([]);
	const [location, setLocation] = useState({
		city: '',
		state: ''
	});

	// Populate saved locations if any
	useEffect(() => {
		const locations = JSON.parse(localStorage.getItem("savedLocations"));

		if (locations) {
			setSavedLocations(locations);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
	}, [savedLocations]);

	return (
		<WeatherContext.Provider value={{ location, setLocation, savedLocations, setSavedLocations }}>
			<Header />
			<DateTime />
			<MainLocation />
			<SavedLocationsList />
		</WeatherContext.Provider>
	);
}

export default App;
