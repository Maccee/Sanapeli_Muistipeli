import React, { useState, useEffect } from 'react';
import animalList from './animals.json';
import './Sanapeli.css';

function Sanapeli() {
  const [currentAnimal, setCurrentAnimal] = useState("");
  const [currentAnimalName, setCurrentAnimalName] = useState("");
  const [missingLetter, setMissingLetter] = useState("");
  const [letterOptions, setLetterOptions] = useState([]);
  const [animalImage, setAnimalImage] = useState("");
  const [displayFullAnimal, setDisplayFullAnimal] = useState(false);
  const [animalIndex, setAnimalIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  

 
  useEffect(() => {
    if (animalIndex >= animalList.length) {
      setAnimalIndex(0);
      return;
    }

    const animal = animalList[animalIndex];
    setCurrentAnimalName(animal);
    setAnimalImage(`./images/${animal}.png`);

    const upperCaseAnimal = animal.toUpperCase();
    const missingIndex = Math.floor(Math.random() * upperCaseAnimal.length);
    const missingLetter = upperCaseAnimal[missingIndex];
    const displayedAnimal = upperCaseAnimal.replace(missingLetter, '_');
    setCurrentAnimal(displayedAnimal);
    setMissingLetter(missingLetter);

    const alphabet = 'aehijklmnoprstuvyäö'.toUpperCase();
    let randomLetters = [];
    while(randomLetters.length < 3){
      const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if(randLetter !== missingLetter && !randomLetters.includes(randLetter)){
        randomLetters.push(randLetter);
      }
    }

    const allOptions = [...randomLetters, missingLetter];
    allOptions.sort(() => Math.random() - 0.5);
    setLetterOptions(allOptions);
    setButtonDisabled(false);

  }, [animalIndex]);

  const handleLetterClick = (letter) => {
    if(letter === missingLetter){
      setButtonDisabled(true);
      setDisplayFullAnimal(true);
  
      setTimeout(() => {
        setDisplayFullAnimal(false);
        setAnimalIndex(prevIndex => prevIndex + 1);
      }, 1000);
    } else {
      document.body.classList.add('pulse');
      setTimeout(() => document.body.classList.remove('pulse'), 200);
    }
  }

  return (
    <div>
      <div className='sanapelicontainer'>
      
        <figure>
          <img className='sanapeliimg' src={animalImage} alt={currentAnimalName} />
        </figure>
        <h1>{displayFullAnimal ? currentAnimalName.toUpperCase() : currentAnimal}</h1>
        <div>
          {letterOptions.map((letter, i) => (
            <button className='sanapelibutton' key={i} onClick={() => handleLetterClick(letter)} disabled={buttonDisabled}>
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sanapeli;
