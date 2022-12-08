import './App.css';
import React, { useEffect } from 'react';
import { ReactDOM } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import ReactConfetti from './components/Confetti';

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [isHeld, setIsHeld] = React.useState(false)
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('won');
    }
    
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    //  new array to hold my numbers
    //  loop 10 times
    // push a random number from 1-6 to my array
    // return  array    
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rolDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))      
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElement = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  )
  
  return (
    <div className="App">
      <main>
        {tenzies && <ReactConfetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button
          className='roll-dice'
          onClick={rolDice}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

export default App;
