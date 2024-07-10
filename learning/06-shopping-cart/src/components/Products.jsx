import { products as initialProducts } from '../mocks/products.json'
import './Products.css'
import {AddToCartIcon, RemoveFromCartIcon} from './Icons.jsx'
import { useFilters } from '../hooks/useFilters.js'
import { useCart } from '../hooks/useCart.js'
/*
'products' is a json object like the one in
 './mocks/products.js'
*/
export function Products () {
    const {filterProducts} = useFilters()
    const filteredProducts = filterProducts(initialProducts)

    const { cart, addToCart, removeFromCart } = useCart()
    
    const checkProductInCart = (product) => {
        return cart.some((entry)=> entry.id === product.id)
    }

    return (
        <main className='products'>
            <ul>
            {filteredProducts.slice(0,10).map(product => {
            
            const isProductInCar = checkProductInCart(product);
            
            return (
                    <li key={product.id} className='single-product'>
                        <img src={product.thumbnail}
                             alt={product.title}>
                        </img>
                        <div>
                            <strong>{product.title}</strong> - $
                            <strong>{product.price}</strong>
                        </div>
                        <div>
                            <button style={{backgroundColor: isProductInCar ? 'red' : '#555'}}
                            
                                onClick={()=>{
                                isProductInCar ? 
                                removeFromCart(product):
                                addToCart(product)                            
                            }}>
                                {isProductInCar ?
                                    <RemoveFromCartIcon></RemoveFromCartIcon>:
                                    <AddToCartIcon></AddToCartIcon>
                                }
                            </button>
                        </div>
                    </li>
                   )
                 }
              )
            }
            </ul>
        </main>

    )
}
