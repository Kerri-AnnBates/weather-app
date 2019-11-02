import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import TimeBlock from './components/TimeBlock';
import { SingleCard } from './components/Cards';
function App() {
  const [data, setData] = useState([]);
  const [weatherDescription, setweatherDescription] = useState({});

  useEffect(() => {
    axios.get('https://api.weatherbit.io/v2.0/current?city=Orlando,FL&key=639ea7a56a0443ff83b858ea2fdc7e71')
      .then(res => {
        console.log(res.data.data[0]);
        setData(res.data.data[0]);
        setweatherDescription(res.data.data[0].weather);
      })
      .catch(err => {
        console.log("Error: ", err);
      })
  }, [])

  return (
    <div className="App">
        <Header />
        <TimeBlock />
      <SingleCard data={data} weatherDescription={weatherDescription} />
    </div>
  );
}

export default App;
