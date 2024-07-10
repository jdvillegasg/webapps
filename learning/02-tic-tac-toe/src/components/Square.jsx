import { ticTacToeClickCallback } from "../utils/utils.jsx"
import '../index.css';

export const Square = ({children, boardObj, turnObj, idx, winnerObj}) => {
    return (
      <div className='square' onClick={(event) =>{ticTacToeClickCallback(event, idx, boardObj, turnObj, winnerObj)}}>
          {children}
      </div>
    )
  } 