import React, { useState, useEffect } from 'react';
import moment from "moment";

const DateTime = () => {
	const [currentTimeAndDate, setCurrentTimeAndDate] = useState(moment());

	const updateTime = () => {
		setCurrentTimeAndDate(moment());
	}

	useEffect(() => {
		let timer = setInterval(() => updateTime(), 1000);
		return () => {
			clearTimeout(timer)
		}
	}, []);

	return (
		<div className="time-block">
			<div className="container">
				<div className="date">{currentTimeAndDate.format("dddd, MMM D, YYYY")}</div>
				<div className="time">{currentTimeAndDate.format("h:mm A")}</div>
			</div>
		</div>
	)
}

export default DateTime;