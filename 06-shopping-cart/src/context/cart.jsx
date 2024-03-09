/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { reducer, initialState, CART_ACTION_TYPES } from "../reducers/cart.js"

export const CartContext = createContext()

function useCartReducer () {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = product => dispatch({
            type: CART_ACTION_TYPES.ADD_TO_CART,
            payload: product
        }
    )
    const clearCart = () => dispatch({
        type: CART_ACTION_TYPES.CLEAR_CART
        }
    )
    const removeFromCart = product => dispatch({
            type:CART_ACTION_TYPES.REMOVE_FROM_CART,
            payload:product
        }
    )

    return { state, addToCart, clearCart, removeFromCart }
}


export function CartProvider ({children}) {
    const { state, addToCart, clearCart, removeFromCart } = useCartReducer()   

    return (
        <CartContext.Provider value={{
            cart:state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}