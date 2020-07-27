import React, { useState, useEffect } from 'react';
import moment from "moment";

const TimeBlock = () => {

	const [currentDate, setCurrentDate] = useState(moment().format("dddd, MMM D, YYYY"));
	const [currentTime, setCurrentTime] = useState(moment().format("h:m A"));
	// const [count, setCount] = useState(0);

	// const updateTime = () => {
	// 	setCurrentTime(moment().format("h:m A"));

	// }

	// useEffect(() => {
	// 	setInterval(updateTime(), 1000);

	// }, [currentTime])

	// console.log(count);

	return (
		<div className="time-block">
			<div className="container">
				<div className="date">{currentDate}</div>
				<div className="time">{currentTime}</div>
			</div>
		</div>
	)
}

export default TimeBlock;