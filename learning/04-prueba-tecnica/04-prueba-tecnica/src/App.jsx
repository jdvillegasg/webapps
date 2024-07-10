import './App.css'
import { useFactRefresh } from './hooks/useFactRefresh.js'
import { useCatImg } from './hooks/useCatImg.js'

export function App (){
    const {factState, refreshRandomFact} = useFactRefresh()
    const {catImageUrl} = useCatImg ({factState})

    const handleClick = async () => {
        refreshRandomFact();
    }

    return (
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new</button>
            {factState && <p>{factState}</p>} 
            {catImageUrl && <img src={catImageUrl} alt='Pictures of cats'></img>}            
        </main>        
    )
}