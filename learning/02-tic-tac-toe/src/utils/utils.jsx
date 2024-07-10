import { detectWinner } from '../logic/board.js'
import {Turns} from '../constants.js';

export const ticTacToeClickCallback = (e, idx, boardObj, turnObj, winnerObj) => {
    console.log(boardObj)
    const tmpBoardState = boardObj.boardState;
    const setBoardState = boardObj.setBoardState;
  
    const turnState = turnObj.turnState;
    const setTurnState = turnObj.setTurnState;

    const winnerState = winnerObj.winnerState;
    const setWinnerState = winnerObj.setWinnerState;
  
    const isCellEmpty = tmpBoardState[idx] === null ? true: false;

    //To set a state is an async operation
    // But it DEFINITIVELY will execute before next's user click
    switch (turnState){
      case 'x':
        if (isCellEmpty && winnerState === null) {
          tmpBoardState[idx] = Turns.X;
          setBoardState(tmpBoardState);
          setTurnState(Turns.O);
        }   
        break;
      case 'o':
        if (isCellEmpty && winnerState === null) {
          tmpBoardState[idx] = Turns.O;
          setBoardState(tmpBoardState);
          setTurnState(Turns.X);
        }      
        break;
      default:
        console.error('Unknown turn state')
    }  

    const winner = detectWinner(tmpBoardState);

    if (winner !== null){
        setWinnerState(winner);
    }else{
      const isEndGame = tmpBoardState.includes(null) ? false : true;
      if (isEndGame){
        setWinnerState("TIE");
      }
    }
  }

export function restartBoard(e, stateSetters){
    stateSetters.setWinnerState(null);
    stateSetters.setBoardState(Array(25).fill(null));
    stateSetters.setTurnState(Turns.X);
}