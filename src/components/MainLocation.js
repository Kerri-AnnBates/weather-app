import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import WeatherContext from "../context/WeatherContext";
import cloudy from "../images/weather.png";

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
		return axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPDATA_KEY}&ipAddress=174.250.20.7`)
			.then(res => {
				console.log(res);
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
			const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=New%20York`;
			// const old = `https://api.weatherbit.io/v2.0/current?city=${result.city},${result.region_code}&key=${process.env.REACT_APP_WEATHER_KEY}`;
			axios.get(url)
				.then(res => {
					// const data = res.data.data[0];

					// setWeatherData({
					// 	temp: data.temp,
					// 	description: data.weather.description,
					// 	sunrise: data.sunrise,
					// 	sunset: data.sunset
					// })
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

	// useEffect(() => {

	// 	if (location.city !== "" && location.state !== "") {
	// 		const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=New%20York`;

	// 		axios.get(url)
	// 			.then(res => {
	// 				const data = res.data.data[0];
	// 				setWeatherData({
	// 					temp: data.temp,
	// 					description: data.weather.description,
	// 					sunrise: data.sunrise,
	// 					sunset: data.sunset
	// 				})
	// 			})
	// 			.catch(err => {
	// 				console.log("Error: ", err);
	// 				console.log("Invalid submission");
	// 				setLocation({
	// 					city: "Location not found",
	// 					state: ""
	// 				});

	// 				setWeatherData({
	// 					temp: "Error",
	// 					description: "Error",
	// 					sunrise: "Error",
	// 					sunset: "Error"
	// 				})
	// 			})
	// 	}

	// }, [location.city, location.state]);

	const saveLocation = () => {
		const found = savedLocations.find(loc => loc.city === location.city.toLowerCase());

		if (found) {
			// console.log("That location is already saved!");
			alert("That location is already saved!");
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
		<section className="main-section curve">
			<div className="main-section__center container">
				<div className="main-card shadow">
					<div className="main-card__header">
						<h3><span className="title-city">{location.city}</span>, <span className="title-state">{location.state}</span></h3>
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
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,170.7C672,149,768,107,864,80C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
		</section>
	)
}

export default MainLocation;