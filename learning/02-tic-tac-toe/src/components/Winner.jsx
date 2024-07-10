import { restartBoard } from "../utils/utils.jsx"
import '../index.css'

export function Winner ({children, winner, stateSetters}){
    if (winner === null){
        return null
    } else {
        return (
            <section className="winner">
                <h1>The winner is</h1>
                <div><span>{children}</span></div> 
                <div><button onClick={(e) => {restartBoard(e, stateSetters)}}>RESTART</button></div> 
            </section>
        )
    }
}