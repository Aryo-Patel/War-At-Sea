import React from 'react';

import Header from './components/Header';
import Points from './components/Points';

import Allies from './components/pickers/Allies';
import Axis from './components/pickers/Axis';

import AlliesList from './components/lists/AlliesList';
import AxisList from './components/lists/AxisList';

import AddtoDB from './components/AddtoDB';


import './app.css';


import { Provider } from 'react-redux';
import store from './store';
function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="game-preference-wrapper">
          <Points />
          <Allies />
          <Axis />
        </div>
        <div className="card-results">
          <AlliesList />
          <AxisList />
        </div>
        <AddtoDB />
      </div>
    </Provider>
  );
}

export default App;
