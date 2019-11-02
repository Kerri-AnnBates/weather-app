import React from 'react';

export const SingleCard = () => {
    return (
        <div className="main-card-container">
            <div className="card">
                <div className="header">
                    <h3>Orlando</h3>
                    <a href="#" className="save">Save location</a>
                </div>
                <div className="body">
                    <div className="temp">
                        <p>80 &#xb0;</p>
                        <p>Sunny</p>
                    </div>
                </div>
            </div>
        </div>
    )
}