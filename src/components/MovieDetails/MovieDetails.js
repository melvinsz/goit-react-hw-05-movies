import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const TourDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Помилка отримання даних');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>
      {movie && (
        <div className="film-info">
          {movie.poster_path === null ? (
            <img
              src={`https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg`}
              alt="Movie poster"
              width={250}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie poster"
              width={250}
            />
          )}
          <div>
            <h2>{movie.original_title}</h2>
            {movie.vote_average === 0 ? (
              <div>No user score</div>
            ) : (
              <div>
                User score: {((movie.vote_average * 100) / 10).toFixed(0)}%
              </div>
            )}

            <h3>Overview</h3>
            {movie.overview ? (
              <div>{movie.overview}</div>
            ) : (
              <div>No overview added</div>
            )}
            <h3>Genres</h3>
            {movie.genres.length < 1 ? (
              <div>No genres</div>
            ) : (
              <div>
                {movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default TourDetails;
