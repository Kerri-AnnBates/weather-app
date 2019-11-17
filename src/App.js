import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import TimeBlock from './components/TimeBlock';
import { SingleCard } from './components/SingleCard';
import SavedLocationCard from './components/SavedLocationCard';

function App() {
  const [data, setData] = useState([]);
  const [weatherDescription, setweatherDescription] = useState({});
  const [location, setLocation] = useState({
    city: '',
    state: ''
  });
  const [userInput, setUserInput] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);

  // Get geo location
  useEffect(() => {
    axios.get('https://api.ipdata.co?api-key=4ccc16c61a91167bfa77f15dcd58e3348b29874c454764fc14843b2a')
      .then(res => {
        // console.log("Location: ", res.data);
        setLocation({ ...location, city: res.data.city, state: res.data.region_code });
      })
      .catch(err => {
        console.log("Error: ", err);
      })
  }, [])

  // Get weather data based on location.
  useEffect(() => {
    axios.get(`https://api.weatherbit.io/v2.0/current?city=${location.city},${location.state}&key=639ea7a56a0443ff83b858ea2fdc7e71`)
      .then(res => {
        console.log(res.data.data[0]);
        setData(res.data.data[0]);
        setweatherDescription(res.data.data[0].weather);
      })
      .catch(err => {
        console.log("Error: ", err);
        // alert('Sorry, no results from your search. Please ensure "City, ST" entry.');
      })
  }, [location, savedLocations]);

  // Handle change to seach form.
  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  // Handle submit of search form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation({ ...location, city: userInput.split(', ')[0], state: userInput.split(', ')[1] });
    setUserInput('');
  }

  // Save the location and add to collection of saved locations.
  const saveLocation = (location) => {
    setSavedLocations([...savedLocations, location]);
  }

  console.log("saved location:", savedLocations);

  return (
    <div className="App">
      <Header
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userInput={userInput}
      />
      <TimeBlock />
      <SingleCard
        data={data}
        weatherDescription={weatherDescription}
        saveLocation={saveLocation}
      />
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
    </div>
  );
}

export default App;
