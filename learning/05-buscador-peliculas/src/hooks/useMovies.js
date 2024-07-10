import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies (searchState, sortMovies) {
    const [movies, setMovies] = useState([])
    const previousSearch = useRef(searchState)

    /*
     Without using this useCallback, each time there is a new call 
     of useMovies due to rendering, the getMovies function will be 
     created. 

     By passing the function to the useCallback hook, we are only
     creating the function once. That doesn't meant that the getMovies
     function can't be called multiple times.
     */
    const getMovies = useCallback (async (searchState) => {
      if (searchState === previousSearch.current) return

      const movieResults = await searchMovies(searchState)

      setMovies(movieResults)
      previousSearch.current = searchState
    }, [])

    /* When the useMovies hook is called during a re-render, 
    the useMemo code will only be executed
    if 'sortMovies' or 'movies' have changed.

    Thus, although the useMovies is called for rendering when 
    the user is typing something on th search bar,
    since neither 'sortMovies' nor 'movies' have changed,
    it won execute the useMemo hook.
    */
    const sortedMovies = useMemo(()=>{
      // The syntax spread [...]movies DOES NOT MUTATE THE STATE OF movies
      return sortMovies? [...movies].sort((a,b)=> {
          // Sort from descending year
          if (a.year > b.year) return -1
          if (a.year < b.year) return 1
          if (a.year === b.year) return 0
         }): movies
    }, [sortMovies, movies])

    return {movies: sortedMovies, getMovies}
}