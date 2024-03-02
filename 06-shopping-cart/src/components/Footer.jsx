import './Footer.css'

// eslint-disable-next-line react/prop-types
export function Footer ({filters}) {
    return (
        <footer className='footer'>
         {
            /**<h4>React tutorial created originally by Midudev
            <span>Julian Villegas</span>
            </h4>
            <h5>Shopping cart</h5>            
             */
         }
         
         {
            /** Footer to show our filters during software development phase */
            JSON.stringify(filters)
         }
            
        </footer>
    )
}