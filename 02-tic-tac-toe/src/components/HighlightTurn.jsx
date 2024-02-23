import '../index.css';
import {Turns} from '../constants.js';

export const HighlightTurn = ({children, turnObj}) => {
  const classname_x = `square ${turnObj.turnState === Turns.X ? 'is-selected': ''}`;
  const classname_o = `square ${turnObj.turnState === Turns.O ? 'is-selected': ''}`;
  return(
    <section className='turn'>
      <div className={classname_x}>
        {Turns.X}
      </div>
      <div className={classname_o}>
        {Turns.O}
      </div>
    </section>
  )
}