import React, { useState } from 'react';

const TimeBlock = () => {
    const today = new Date();
    let currenthour = today.getHours();
    let mins = today.getMinutes();

    // Format hours
    if(currenthour < 10) { currenthour = `0${currenthour}`}
    if(currenthour > 12) { currenthour = currenthour % 12 }

    //Format minutes
    if(mins < 10) { mins = `0${mins}` }

    const [time, setTime] = useState({
        hour: currenthour,
        minutes: mins
    });

    console.log("Date", today);
    return (
        <div className="time-block">
            <div className="container">
                <div className="date">Tuesday Jan 3, 2020</div>
                <div className="time">{`${time.hour}:${time.minutes}`} {today.getHours() < 12 ? 'AM' : 'PM'}</div>
            </div>
        </div>
    )
}

export default TimeBlock;