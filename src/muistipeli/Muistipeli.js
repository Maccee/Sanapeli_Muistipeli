import React, { useState, useEffect } from 'react';
import './Muistipeli.css';

const images = [
    '/images/ankka.png',
    '/images/hevonen.png',
    '/images/hiiri.png',
    '/images/hirvi.png',
    '/images/jänis.png',
    '/images/kana.png',
    '/images/karhu.png',
    '/images/kettu.png',
    '/images/kissa.png',
    '/images/koira.png',
    '/images/lehmä.png',
    '/images/lintu.png',
    '/images/lokki.png',
    '/images/majava.png',
    '/images/orava.png',
    '/images/ötökkä.png',
    '/images/pöllö.png',
    '/images/sammakko.png',
    '/images/siili.png',
    '/images/sika.png',
    '/images/susi.png',
];


function Muistipeli() {
    // All images array

    const [cards, setCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        restartGame();
    }, []);

    useEffect(() => {
        if (matchedCards.length === 16) {
            setTimeout(() => {
                restartGame();
            }, 1000);
        }
    }, [matchedCards]);
    

    function restartGame() {
        setOpenCards([]);
    
        const randomImages = [];
        while (randomImages.length < 8) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            if (!randomImages.includes(randomImage)) {
                randomImages.push(randomImage);
            }
        }
    
        const cards = shuffle([...randomImages, ...randomImages])
            .map((image, index) => ({
                image,
                index,
            }));
    
        setCards(cards);
        setMatchedCards([]);
    }
    

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    function flipCard(index) {
        if (openCards.length === 2 || openCards.includes(index) || matchedCards.includes(index)) {
            return;
        }
    
        setOpenCards((currentOpenCards) => [...currentOpenCards, index]);
    
        if (openCards.length + 1 === 2) {
            const firstCardIndex = openCards[0];
            const secondCardIndex = index;
    
            if (cards[firstCardIndex].image === cards[secondCardIndex].image) {
                setMatchedCards((currentMatchedCards) => [...currentMatchedCards, firstCardIndex, secondCardIndex]);
                setOpenCards([]);
            } else {
                setTimeout(() => {
                    setOpenCards([]);
                }, 1000);
            }
        }
    }
    


    return (
        <div className="Muistipeli">
            {cards.map((card, index) => {
                const isOpen = openCards.includes(index);
                const isMatched = matchedCards.includes(index);
                const classes = `card ${isOpen ? 'open' : ''} ${isMatched ? 'matched' : ''}`;

                return (
                    <div
                        className={classes}
                        key={index}
                        onClick={() => flipCard(index)}
                    >
                        <img src={card.image} alt="memory card" />
                    </div>
                );
            })}
        </div>
    );

}


export default Muistipeli;
