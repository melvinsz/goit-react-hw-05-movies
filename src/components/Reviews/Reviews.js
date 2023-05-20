import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '7ea31d9c7e810941c666239a775266d7';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [movieId]);

  return (
    <>
      {reviews.length < 1 ? (
        <div>No reviews</div>
      ) : (
        <ul>
          {reviews.map(review => {
            return (
              <li key={`${review.id}`}>
                Author: {review.author} <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
