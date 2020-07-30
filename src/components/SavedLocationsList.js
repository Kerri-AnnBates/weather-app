import React, { useContext } from "react";
import SavedLocationCard from "./SavedLocationCard";
import WeatherContext from "../context/WeatherContext";

const SavedLocationsList = () => {
	const { savedLocations } = useContext(WeatherContext);

	return (
		<div className="saved-container" id="saved-location">
			<div className="container">
				<h3>Saved Locations</h3>
				<div className="saved-wrapper flex-container">
					{(savedLocations.length > 0) && savedLocations.map((location, index) => (
						<SavedLocationCard
							key={index}
							location={location}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default SavedLocationsList;