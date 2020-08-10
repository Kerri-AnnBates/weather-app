import React, { useContext } from "react";
import SavedLocationCard from "./SavedLocationCard";
import WeatherContext from "../context/WeatherContext";

const SavedLocationsList = () => {
	const { savedLocations, setSavedLocations } = useContext(WeatherContext);

	const onRemove = (city) => {
		const locations = savedLocations.filter((location) => {
			return city.toLowerCase() !== location.city.toLowerCase();
		});

		setSavedLocations(locations);
	}

	return (
		<section className="saved-container" id="saved-location">
			<div className="container">
				<h3>Saved Locations</h3>
				<div className="saved-wrapper flex-container">
					{(savedLocations.length > 0) && savedLocations.map((location, index) => (
						<SavedLocationCard
							key={index}
							location={location}
							onRemove={onRemove}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default SavedLocationsList;