import { NavLink, Route, Routes } from 'react-router-dom';
import FilmList from '../pages/FilmList';

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
        <Route path="/" element={<FilmList />} />
      </Routes>
    </>
  );
};
