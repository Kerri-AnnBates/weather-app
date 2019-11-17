import React from 'react';
import cloudy from '../images/weather.png';
// import sunnyImg from '../images/sunlight.png';
// import rainyImg from '../images/rain.png';
// import snow from '../images/snow.png';

export const SingleCard = (props) => {
    const { data, weatherDescription, saveLocation } = props;
    // console.log("single card:", data);
    // Convert temp to fahrenheit
    const tempToFahrenheit = (temp) => (temp * 9/5) + 32;
    const tempInFahrenheit = tempToFahrenheit(data.temp);

    return (
        <div className="main-card-container">
            <div className="card">
                <div className="header">
                    <h3>{data.city_name}, {data.state_code}</h3>
                    <button className="save" onClick={() => {saveLocation(data)}}>Save location</button>
                </div>
                <div className="body">
                    <div className="temp flex-container">
                        <div className="img-container">
                            <img src={cloudy} alt="cloudy weather" />
                        </div>
                        <div className="main-description">
                            <p className="title-md">{tempInFahrenheit} &#xb0;F</p>
                            <p className="title-sm">{weatherDescription.description}</p>
                        </div>
                    </div>
                    <div className="misc-description">
                        <p>Sunrise: {data.sunrise}</p>
                        <p>Sunset: {data.sunset}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}