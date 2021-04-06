import { useState, useEffect } from 'react';
import './App.scss';
import ButtonPanel from './Components/Button-Panel/ButtonPanel.js'

import ListsAndSearch from './Components/ListsAndSearch/ListsAndSearch.js';

const App = () => {
  return (
    <div className="App">
      <h1>GOFISH</h1>
      <div className="login-container">
      {/* // do login / signup shit */}
      </div>

      <div className="button-panel">
        <ButtonPanel />
      </div>

     <div className="lists-and-search">
       <ListsAndSearch />
     </div>
  </div>
  );
}

export default App;
