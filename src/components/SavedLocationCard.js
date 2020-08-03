import React from "react";

const SavedLocationCard = (props) => {
	const { location, onRemove } = props;

	return (
		<div className="saved-card">
			<span className="close" onClick={() => onRemove(location.city)}>X</span>
			<div className="saved-card__body">
				<div className="saved-card__temp">
					<p className="saved-card__title">{location.temp} &#xb0;F</p>
				</div>
				<div className="saved-card__details">
					<p>{location.city}, {location.state}</p>
					<p className="saved-card__description">{location.description}</p>
				</div>
			</div>
		</div>
	)
}

export default SavedLocationCard;
