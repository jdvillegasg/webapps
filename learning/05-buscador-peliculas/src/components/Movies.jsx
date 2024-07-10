import PropTypes from 'prop-types'

export function Movies ({movies}) {
    const hasMovies = movies?.length > 0
    return (
        <ul className='list-movies'>
            {hasMovies?
                (movies.map(movie => (
                        <li key={movie.id} className='single-movie'>
                          <h3>{movie.title}</h3>
                          <p>{movie.year}</p>
                          <img src={movie.img_url} alt={movie.title}></img>
                        </li>
                      )
                    )
                ):
                <p>No movie results available</p>
            }
        </ul>
    )
}

Movies.propTypes = {
    movies: PropTypes.array,
}
