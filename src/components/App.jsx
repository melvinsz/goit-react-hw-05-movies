import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import HomeList from './HomeList/HomeList';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomeList />} />
        <Route path="/movies" element={<MovieList />}>
          <Route path=":movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <h2>
              <button onClick={() => navigate(-1)}>Go back</button>
              <p>Incorrect path</p>
            </h2>
          }
        ></Route>
      </Routes>
    </>
  );
};
