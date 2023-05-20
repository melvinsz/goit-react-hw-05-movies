import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('query') || '';

  const handleChange = event => {
    setSearchParams({ query: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value !== '') {
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to find movies');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          setMovies(data.results);
        })
        .catch(error => {
          console.log(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      {movieId ? (
        <Outlet />
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" autoComplete="off" onChange={handleChange} />
          <button type="submit">Search</button>
          {loading && (
            <div className="loader">
              <ColorRing />
            </div>
          )}
          <ul>
            {movies.map(movie => {
              return (
                <li key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              );
            })}
          </ul>
        </form>
      )}
    </>
  );
};

export default MovieList;
