import React from 'react'
import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}) {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="front card" className="front" />
        <img onClick={handleClick} src="/img/ts-zoom.png" alt="back card" className="back" />
      </div>
    </div>
  )
}
