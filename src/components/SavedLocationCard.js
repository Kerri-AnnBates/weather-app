import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import WeatherContext from "../context/WeatherContext";

const SavedLocationCard = (props) => {
	const { savedLocations, setSavedLocations } = useContext(WeatherContext);
	const { location, onRemove } = props;
	const [currentWeahterData, setCurrentWeatherData] = useState({
		temp: null,
		description: ""
	});

	const updateWeather = () => {
		if (location.city !== "" && location.state !== "") {
			axios.get(`https://api.weatherbit.io/v2.0/current?city=${location.city},${location.state}&key=${process.env.REACT_APP_WEATHER_KEY}`)
				.then(res => {
					const data = res.data.data[0];
					setCurrentWeatherData({
						temp: data.temp,
						description: data.weather.description,
					});
				})
				.catch(err => {
					console.log("Error: ", err);
				})
		}
	}

	useEffect(() => {

		if (currentWeahterData.temp !== null && currentWeahterData.description !== "") {
			const updatedLocation = {
				...location,
				temp: currentWeahterData.temp,
				description: currentWeahterData.description
			}
			const newArr = [...savedLocations];
			const index = savedLocations.indexOf(location);

			newArr[index] = updatedLocation;
			setSavedLocations(newArr);
		}

	}, [currentWeahterData])

	return (
		<div className="saved-card shadow">
			<span className="close" onClick={() => onRemove(location.city)}>X</span>
			<div className="saved-card__body">
				<div className="saved-card__temp">
					<p className="saved-card__title">{(location.temp) ? Math.ceil((location.temp * 9 / 5) + 32) : "Loading..."} &#xb0;F</p>
				</div>
				<div className="saved-card__details">
					<p><span className="title-city">{location.city}</span>, <span className="title-state">{location.state}</span></p>
					<p className="saved-card__description">{location.description}</p>
				</div>
				<button className="button" onClick={updateWeather}>Update</button>
			</div>
		</div>
	)
}

export default SavedLocationCard;
