import React, { useState } from "react";
import axios from "axios";

const SavedLocationCard = (props) => {
	const { location, onRemove } = props;
	const [currentWeahterData, setCurrentWeatherData] = useState({
		temp: location.temp,
		description: location.description
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

	return (
		<div className="saved-card">
			<span className="close" onClick={() => onRemove(location.city)}>X</span>
			<div className="saved-card__body">
				<div className="saved-card__temp">
					<p className="saved-card__title">{(currentWeahterData.temp) ? Math.ceil((currentWeahterData.temp * 9 / 5) + 32) : "Loading..."} &#xb0;F</p>
				</div>
				<div className="saved-card__details">
					<p>{location.city}, {location.state}</p>
					<p className="saved-card__description">{currentWeahterData.description}</p>
				</div>
				<button onClick={updateWeather}>Update</button>
			</div>
		</div>
	)
}

export default SavedLocationCard;
