import React from 'react'

const SavedLocationCard = (props) => {
    const { location, weatherDescription } = props;

    const tempToFahrenheit = (temp) => (temp * 9 / 5) + 32;
    const tempInFahrenheit = tempToFahrenheit(location.temp);

    return (
        <div className="saved-card">
            <header><h3>{location.city_name}</h3></header>
            <div className="body">
                <div className="temp flex-container">
                    <div className="main-description">
                        <p className="title-md">{tempInFahrenheit} &#xb0;F</p>
                        <p className="title-sm">{weatherDescription.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedLocationCard
