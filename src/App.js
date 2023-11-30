import React, { useState } from 'react';
import './reset.css';
import './App.css';
import Sanapeli from './sanapeli/Sanapeli';
import Muistipeli from './muistipeli/Muistipeli';

function App() {
  const [game, setGame] = useState(null);

  return (
    <div>
      <div className='navbar'>
        <button onClick={() => game === 'sanapeli' ? setGame(null) : setGame('sanapeli')}>
          Sanapeli
        </button>
        <button onClick={() => game === 'muistipeli' ? setGame(null) : setGame('muistipeli')}>
          Muistipeli
        </button>
        
        {/* Add more buttons for more games as needed */}
      </div>

      <div className="game-container">
        {game === 'sanapeli' && <Sanapeli />}
        {game === 'muistipeli' && <Muistipeli />}
        {/* Render other games based on the value of `game` 
        munapeli - dinosaurusvauvoja
        lahjapeli - eri juttuja.
        kellopeli*/}
      </div>
    </div>
  );
}

  
  export default App;
  
