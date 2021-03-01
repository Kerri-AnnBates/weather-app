import React, { useEffect, useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import cloudy from "../images/weather.png";
import { getInitialLocation, getWeahter } from "../api/api";

const MainLocation = () => {
	const { location, setLocation, savedLocations, setSavedLocations, weatherData, setWeatherData } = useContext(WeatherContext);

	useEffect(() => {
		// Get geo location on load.
		getInitialLocation()
			.then(data => {
				setLocation({
					city: data.city,
					state: data.region
				});

				// Get weather after location received.
				getWeahter(data.city, data.region)
					.then(weather => {
						const data = weather.data.data[0];

						setWeatherData({
							temp: data.temp,
							description: data.weather.description
						});
					})
					.catch(err => {
						console.log(err);
					})
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

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
					</div>
				</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,170.7C672,149,768,107,864,80C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
		</section>
	)
}

export default MainLocation;