import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const Cast = () => {
  const { movieId } = useParams();

  const [casts, setCast] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [movieId]);

  return (
    <>
      {casts.length < 1 ? (
        <div>No cast avaliable</div>
      ) : (
        <ul>
          {casts.map(cast => {
            return (
              <li key={`${cast.id}`}>
                {cast.profile_path === null ? (
                  <img
                    src={`https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg`}
                    alt="Movie poster"
                    width={50}
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt="Movie poster"
                    width={50}
                  />
                )}

                <>
                  <p>{cast.name}</p>
                  <p>Character: {cast.character}</p>
                </>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Cast;
