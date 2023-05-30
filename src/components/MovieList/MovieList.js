import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('query') ?? '';

  const location = useLocation();

  const handleChange = event => {
    if (event.target.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (value !== '') {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to find movies');
        }
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (value !== '') {
      handleSubmit({ preventDefault: () => {} });
    }
  }, []);

  return (
    <>
      {movieId ? (
        <Outlet />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            autoComplete="off"
            onChange={handleChange}
          />
          <button type="submit">Search</button>
          {loading && (
            <div className="loader">
              <ColorRing />
            </div>
          )}
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </form>
      )}
    </>
  );
};

export default MovieList;
