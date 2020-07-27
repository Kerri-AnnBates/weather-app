import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import TimeBlock from './components/TimeBlock';
import { SingleCard } from './components/SingleCard';
import SavedLocationList from './components/SavedLocationList';

function App() {
	const [data, setData] = useState([]);
	const [weatherDescription, setweatherDescription] = useState({});
	const [location, setLocation] = useState({
		city: '',
		state: ''
	});
	const [userInput, setUserInput] = useState('');
	const [savedLocations, setSavedLocations] = useState([]);

	// Get geo location on load.
	useEffect(() => {
		axios.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IPDATA_KEY}`)
			.then(res => {
				// console.log("Location: ", res.data);
				setLocation({ ...location, city: res.data.city, state: res.data.region_code });
			})
			.catch(err => {
				console.log("Error: ", err);
			})

		//Get locations from local storage on load.  
		const item = window.localStorage.getItem('savedLocation');
		if (item) {
			setSavedLocations(JSON.parse(item));
		}
	}, []);

	// Get weather data based on location.
	useEffect(() => {
		axios.get(`https://api.weatherbit.io/v2.0/current?city=${location.city},${location.state}&key=${process.env.REACT_APP_WEATHER_KEY}`)
			.then(res => {
				console.log(res.data.data[0]);
				setData(res.data.data[0]);
				setweatherDescription(res.data.data[0].weather);
			})
			.catch(err => {
				console.log("Error: ", err);
				// alert('Sorry, no results from your search. Please ensure "City, ST" entry.');
			})
	}, [location, savedLocations]);

	// Handle change to seach form.
	const handleChange = (e) => {
		setUserInput(e.target.value);
	}

	// Handle submit of search form
	const handleSubmit = (e) => {
		e.preventDefault();
		setLocation({ ...location, city: userInput.split(', ')[0], state: userInput.split(', ')[1] });
		setUserInput('');
	}

	// Save the location and add to collection of saved locations.
	const saveLocation = (location) => {
		setSavedLocations([...savedLocations, location]);
	}

	// Save locations to local storage if there are any saved.
	if (savedLocations.length > 0) {
		localStorage.setItem('savedLocation', JSON.stringify(savedLocations));
	}

	return (
		<div className="App">
			<Header
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				userInput={userInput}
			/>
			<TimeBlock />
			<SingleCard
				data={data}
				weatherDescription={weatherDescription}
				saveLocation={saveLocation}
			/>
			<SavedLocationList
				savedLocations={savedLocations}
			/>
		</div>
	);
}

export default App;
