import './App.css'
import { Products } from './components/Products.jsx'
import { Header} from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'

function App() {
  return (
    <CartProvider>
      <Header></Header>
      <Cart></Cart>
      <Products></Products>
      {IS_DEVELOPMENT && <Footer></Footer>}  
    </CartProvider>
  )
}

export default App
