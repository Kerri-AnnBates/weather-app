import React from 'react';
import './App.css';
import Header from './components/Header';
import TimeBlock from './components/TimeBlock';
import { SingleCard } from './components/Cards';

function App() {
  return (
    <div className="App">
        <Header />
        <TimeBlock />
        <SingleCard />
    </div>
  );
}

export default App;
