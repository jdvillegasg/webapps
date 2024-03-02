import './Products.css'
import {AddToCartIcon} from './Icons.jsx'

/*
'products' is a json object like the one in
 './mocks/products.js'
*/
export function Products (params) {
    const {products} = params
    
    return (
        <main className='products'>
            <ul>
            {products.slice(0,10).map(product => (
                    <li key={product.id} className='single-product'>
                        <img src={product.thumbnail}
                             alt={product.title}>
                        </img>
                        <div>
                            <strong>{product.title}</strong> - $
                            <strong>{product.price}</strong>
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon></AddToCartIcon>
                            </button>
                        </div>   
                    </li>
            ))
            }
            </ul>
        </main>

    )
}
