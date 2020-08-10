import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import moment from "moment";
import WeatherContext from "../context/WeatherContext";
import cloudy from "../images/weather.png";
// import sunnyImg from '../images/sunlight.png';
// import rainyImg from '../images/rain.png';
// import snow from '../images/snow.png';

const MainLocation = () => {
	const { location, setLocation, savedLocations, setSavedLocations } = useContext(WeatherContext);
	const [weatherData, setWeatherData] = useState({
		temp: null,
		description: "",
		sunrise: "",
		sunset: ""
	});

	// Get geo location
	const getInitialLocation = () => {
		return axios.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IPDATA_KEY}`)
			.then(res => {
				console.log(res.data);
				setLocation({ city: res.data.city, state: res.data.region_code });
				return res.data;
			})
			.catch(err => {
				console.log("Error:", err);
			})
	}

	// Get weather
	const getWeather = async () => {
		const result = await getInitialLocation();

		if (result) {
			axios.get(`https://api.weatherbit.io/v2.0/current?city=${result.city},${result.region_code}&key=${process.env.REACT_APP_WEATHER_KEY}`)
				.then(res => {
					console.log(res.data.data[0]);
					const data = res.data.data[0];

					setWeatherData({
						temp: data.temp,
						description: data.weather.description,
						sunrise: data.sunrise,
						sunset: data.sunset
					})
				})
				.catch(err => {
					console.log("Error: ", err);
				})
		} else {
			console.log("Unable to get location")
		}

	}

	// Get geo location on load.
	useEffect(() => {
		getWeather();
	}, []);

	useEffect(() => {

		if (location.city !== "" && location.state !== "") {
			axios.get(`https://api.weatherbit.io/v2.0/current?city=${location.city},${location.state}&key=${process.env.REACT_APP_WEATHER_KEY}`)
				.then(res => {
					console.log(res.data.data[0]);
					const data = res.data.data[0];
					setWeatherData({
						temp: data.temp,
						description: data.weather.description,
						sunrise: data.sunrise,
						sunset: data.sunset
					})
				})
				.catch(err => {
					console.log("Error: ", err);
				})
		}

	}, [location.city, location.state]);

	const saveLocation = () => {
		const found = savedLocations.find(loc => loc.city === location.city.toLowerCase());

		if (found) {
			console.log("That location is already saved!");
		} else {
			setSavedLocations([
				...savedLocations,
				{
					city: location.city.toLowerCase(),
					state: location.state.toLowerCase(),
					temp: weatherData.temp,
					description: weatherData.description
				}
			])
		}

	}

	return (
		<div className="main-card">
			<div className="main-card__header">
				<h3>{location.city}, {location.state}</h3>
				<button
					className="button"
					onClick={saveLocation}
				>Save location</button>
			</div>
			<div className="main-card__body">
				<div className="main-card__description">
					<div className="main-card__img-container">
						<img src={cloudy} alt="cloudy weather" />
					</div>
					<div className="main-card__temp">
						<p className="main-card__temp--title">{(weatherData.temp) ? Math.ceil((weatherData.temp * 9 / 5) + 32) : "Loading..."}&#xb0; F</p>
						<p className="main-card__temp--subtitle">{weatherData.description}</p>
					</div>
				</div>
				{
					//<div className="main-card__misc">
					//<p>Sunrise: {moment(weatherData.sunrise, "HH:mm").format("h:mm A")}</p>
					// <p>Sunset: {moment(weatherData.sunset, "HH:mm").format("h:mm A")}</p>
					// </div>
				}
			</div>
		</div>
	)
}

export default MainLocation;