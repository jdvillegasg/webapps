import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef, useCallback } from 'react'
import {MIN_SEARCH_LENGTH} from './constants/constants.js'
import debounce from "just-debounce-it"

function useSearch () {
  const [searchState, updateSearchState] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect( () => {
    if (isFirstInput.current) {
      isFirstInput.current = searchState === ''
      return
    }

    if (searchState === ''){
      setError('Must write something to be search')
      return
    }
    
    if (searchState.match(/^\d+$/)){
      setError('Can not search a movie containing a number')
      return
    }

    if (searchState.length < MIN_SEARCH_LENGTH) {
      setError(`The length of the search should have at least ${MIN_SEARCH_LENGTH} characters`)
      return
    }

    //Arrives here without errors
    setError(null)

  }, [searchState])

  return {searchState, updateSearchState, error}
}

function App() {
  // State to order movies by year
  const [sortMovies, setSortMovies] = useState(false)

  const {searchState, updateSearchState, error} = useSearch('')
  const { movies, getMovies} = useMovies(searchState, sortMovies)

  /*
  First parameter passed to debounceSearchMovies will be 
  the 'newSearch' parameter of debounce
  */ 
  const debounceSearchMovies = useCallback(
    debounce(newSearch => {
    console.log("Inside debounce callbakc", newSearch)
    getMovies(newSearch)
  }, 200), [getMovies])
  

  const handleSubmit = (event) => {
      event.preventDefault()

      /*
      const fields = Object.fromEntries(new FormData(event.target))
      console.log('Input fields', fields.query)
      */
      getMovies(searchState)
  }

  const handleSort = () => {
    setSortMovies(!sortMovies) 
  }

  const handleOnChange = (event) => {
    const newSearch = event.target.value
    updateSearchState(newSearch)

    /*
    Without a debouncer, the api requests will be sent constantly.
    This can bring problems, because the REST service might not answer
    the requests in the same order it received them. 

    This means that when typing a movie in the search bar, the results
    that will appear as we type, might not be of the word composed
    by the last letters typed, but instead, composed by the previous chain 
    of letters typed. 
    Example: 
    The user start typing:
    1. m
    2. ma
    3. mat
    4. matr
    5. matri
    6. matrix
    Without the debouncer, it can happen that at time 6, when he was expecting
    to see the results for 'matrix', he would obtained the results for 'mat'.
    */
   
    debounceSearchMovies(newSearch)
  }

  return (
        <div className="page"> 
          <header>
            <h1>Movie search</h1>
            <form className="movies-form" onSubmit={handleSubmit}>
              <input  onChange={handleOnChange}
                      name="query"
                      placeholder="Avengers, The Matrix, ..."
                      style = {{border: '1px solid transparent',
                                borderColor: error? 'red': 'transparent'}}
              >
              </input>
              <input type='checkbox' onChange={handleSort} checked={sortMovies}></input>
              <button type="submit">Search</button>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
          </header>
          <main>
            <Movies movies={movies}></Movies>
          </main>
        </div>
        )
}

export default App
