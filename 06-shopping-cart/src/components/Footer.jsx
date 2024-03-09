import './Footer.css'
//import { useFilters } from '../hooks/useFilters'

// eslint-disable-next-line react/prop-types
export function Footer () {
    //const {filters} = useFilters()
    
    return (
        <footer className='footer'>
            <h4>React tutorial created originally by Midudev</h4>
            <span>Implemented here by Julian Villegas</span>
            <h5>Shopping cart</h5> 

            {
                /*
                JSON.stringify(filters)
                */ 
            }     
        </footer>
    )
}