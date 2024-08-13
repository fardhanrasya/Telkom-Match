import './App.css'
import {useCallback, useEffect, useState} from "react"
import SingleCard from './components/SingleCard'

  const cardImages = [
    { "src": "/img/zev.jpg", matched: false },
    { "src": "/img/bintang.jpg", matched: false },
    { "src": "/img/acad.jpg", matched: false },
    { "src": "/img/manu.jpg", matched: false },
    { "src": "/img/banyu.jpg", matched: false },
    { "src": "/img/dimas.jpg", matched: false },
  ]

function App() {
  const [cards, setcards] = useState([])
  const [showTurn, setShowTurn] = useState(false)
  const [turns, setturns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setcards(shuffledCards)
    setturns(0)
    setShowTurn(true)
  }, []) 

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setcards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              console.log(card);
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 500)
      }
    } 
  }, [choiceOne, choiceTwo])

  console.log(cards);
  
  
  const resetTurn = () => {
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setturns((prevValue) => prevValue + 1)
  }

  return (
    <div className="App">
      <h1>Telkom Match</h1>
      <div className="card-grid">
        {cards.map(card => 
        <SingleCard 
        key={card.id} 
        card={card} 
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
        )}
      </div>
      {showTurn && <p>Turns: {turns}</p>}
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App