import { NavLink, Route, Routes } from 'react-router-dom';
import HomeList from './HomeList/HomeList';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

// const API_KEY = '7ea31d9c7e810941c666239a775266d7';

export const App = () => {
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
        <Route path="*" element={<h2>Incorrect path</h2>}></Route>
      </Routes>
    </>
  );
};