import React from 'react';

export const SingleCard = (props) => {
    const { data, weatherDescription } = props;
    
    // Convert temp to fahrenheit
    const tempToFahrenheit = (temp) => (temp * 9/5) + 32;
    const tempInFahrenheit = tempToFahrenheit(data.temp);

    return (
        <div className="main-card-container">
            <div className="card">
                <div className="header">
                    <h3>{data.city_name}, {data.state_code}</h3>
                    <a href="#" className="save">Save location</a>
                </div>
                <div className="body">
                    <div className="temp">
                        <p>{tempInFahrenheit} &#xb0;</p>
                        <p>{weatherDescription.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}