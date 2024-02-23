import { useState } from 'react';
import { Square } from './components/Square.jsx';
import { HighlightTurn } from './components/HighlightTurn.jsx';
import './index.css';
import {Turns} from './constants.js';
import { Winner } from './components/Winner.jsx';

export default function App() {
  // Create the board and fill it with Nulls
  const board = Array(25).fill(null);
  const [boardState, setBoardState] = useState(board);
  const [turnState, setTurnState] = useState(Turns.X);
  const [winnerState, setWinnerState] = useState(null);

  return (
    <>
    <main className='board'>
      <h1>
        Tic Tac Toe
      </h1>
      <section className='game'>
         {boardState.map((val, idx) => {
              return (
                      <Square key={idx}
                              idx={idx}
                              boardObj={{'boardState':boardState, 'setBoardState':setBoardState}}
                              turnObj={{'turnState':turnState, 'setTurnState':setTurnState}}
                              winnerObj={{'winnerState': winnerState, 'setWinnerState': setWinnerState}}>
                        {val}
                      </Square>
                    )
                })
          }
      </section>
      <HighlightTurn turnObj={{'turnState':turnState, 
                               'setTurnState':setTurnState}}>
      </HighlightTurn>
      <Winner winner={winnerState} 
              stateSetters={{'setBoardState':setBoardState, 'setTurnState':setTurnState, 'setWinnerState': setWinnerState}}>
        {winnerState}
      </Winner>
    </main>
    </>
  )  
}

