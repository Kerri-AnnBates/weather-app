import React from 'react';
import SavedLocationCard from './SavedLocationCard';

function SavedLocationList(props) {
	const { savedLocations } = props;
	return (
		<div className="saved-container" id="saved-location">
			<div className="container">
				<h3>Saved Locations</h3>
				<div className="saved-wrapper flex-container">
					{/* Saved location cards */}
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

export default SavedLocationList
