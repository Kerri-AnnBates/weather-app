import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import moment from "moment";
import WeatherContext from '../context/WeatherContext';
import cloudy from '../images/weather.png';
// import sunnyImg from '../images/sunlight.png';
// import rainyImg from '../images/rain.png';
// import snow from '../images/snow.png';

const MainLocation = () => {
	const { location, setLocation } = useContext(WeatherContext);
	const [weatherData, setWeatherData] = useState({
		temp: null,
		description: "",
		sunrise: "",
		sunset: ""
	});

	// Convert temp to fahrenheit
	const tempInFahrenheit = () => {
		return (weatherData.temp) ? (weatherData.temp * 9 / 5) + 32 : "Loading...";
	}

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
	}

	// Get geo location on load.
	useEffect(() => {
		getWeather();
	}, []);

	return (
		<div className="main-card-container">
			<div className="card">
				<div className="header">
					<h3>{location.city}, {location.state}</h3>
					<button className="save">Save location</button>
				</div>
				<div className="body">
					<div className="temp flex-container">
						<div className="img-container">
							<img src={cloudy} alt="cloudy weather" />
						</div>
						<div className="main-description">
							{tempInFahrenheit() && <p className="title-md">{tempInFahrenheit()} &#xb0;F</p>}
							<p className="title-sm">{weatherData.description}</p>
						</div>
					</div>
					<div className="misc-description">
						<p>Sunrise: {moment(weatherData.sunrise, "HH:mm").format("h:mm A")}</p>
						<p>Sunset: {moment(weatherData.sunset, "HH:mm").format("h:mm A")}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainLocation;