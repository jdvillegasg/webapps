/* eslint-disable react/prop-types */
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useId } from 'react'
import './Cart.css'
import { useCart } from '../hooks/useCart.js'


function CartItem ({thumbnail, productName, price, quantity, addToCart}) {
 return (
    <li>
        {console.log(addToCart)}
        <img src={thumbnail}
            alt={productName}>
        </img>
        <div>
            <strong>{productName}</strong> ${price}
        </div>
        <footer>
            <small>
                Qty: {quantity}
            </small>
            <button onClick={addToCart}>+</button>
        </footer>
    </li>
 )
}

export function Cart () {
    const cartCheckBoxId = useId()

    const {cart, addToCart, clearCart} = useCart()

    return (
        <>
            <label className='cart-button'
                   htmlFor={cartCheckBoxId}>
                <CartIcon></CartIcon>
            </label>
            <input type='checkbox'
                   id={cartCheckBoxId}
                   hidden>
            </input>
            <aside className='cart'>
                <ul>
                    {
                        cart.map(product => (
                            <CartItem key={product.id}
                                      productName={product.title}
                                      thumbnail={product.thumbnail}
                                      price={product.price}
                                      quantity={product.quantity}
                                      addToCart={()=>addToCart(product)}
                            >
                            </CartItem>
                        ))
                    }
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon></ClearCartIcon>
                </button>
            </aside>            
        </>
    )
}