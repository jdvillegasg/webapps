import { URL_GET } from '../constants/constants.js'

export const searchMovies = async (searchState) => {
    if (searchState === '') return null

    try {
        const response = await fetch(URL_GET+searchState)
        const json = await (response.json())

        const movieResults = json.Search;
        
        // Avoid accesing API endpoint json keys on the components
        const movieResultsMapped = movieResults?.map(movie => (
          {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            img_url: movie.Poster
          }
        ))

        return movieResultsMapped

    }catch(e){
        throw new Error('Fetching movies failed')
    }    
}


