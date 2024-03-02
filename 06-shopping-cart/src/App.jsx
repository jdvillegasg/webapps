import './App.css'
import { Products } from './components/Products.jsx'
import { Header} from './components/Header.jsx'
import { products as initialProducts } from './mocks/products.json'
import {useState} from 'react'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'

function useFilters () {
  // State for filter by category and price
  const [filters, setFiltersState] = useState({'category': 'all', 
                                               'minPrice': 0})

  const filterProducts = (products) => {
    return products.filter(product => {
      return ( 
        product.price >= filters.minPrice && 
        (
          filters.category === 'all' || 
          filters.category === product.category
        )
      )
    })
  }
  return {setFiltersState, filterProducts, filters}
}

function App() {
  // Not using the state setter
  const [productsState] = useState(initialProducts)

  // Use the custom hook
  const {setFiltersState, filterProducts, filters} = useFilters()
  const filteredProducts = filterProducts(productsState)

  return (
    <>
      <Header setterFilter={setFiltersState}></Header>
      <Products products={filteredProducts}></Products>
      {IS_DEVELOPMENT && <Footer filters={filters}></Footer>}  
    </>
  )
}

export default App
