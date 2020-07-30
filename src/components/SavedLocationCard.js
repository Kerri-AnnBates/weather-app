import React from "react";

const SavedLocationCard = (props) => {
	const { location } = props;

	return (
		<div className="saved-card">
			<header><h3>{location.city}</h3></header>
			<div className="body">
				<div className="temp flex-container">
					<div className="main-description">
						<p className="title-md">{location.temp} &#xb0;F</p>
						<p className="title-sm">{location.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SavedLocationCard;
