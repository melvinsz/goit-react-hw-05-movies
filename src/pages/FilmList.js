import { useEffect } from 'react';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const FilmList = () => {
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => console.log(data.results))
      .catch(err => console.error(err));
  }, []);
};

export default FilmList;
