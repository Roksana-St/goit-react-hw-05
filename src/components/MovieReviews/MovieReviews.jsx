import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import { fetchMovieReviews } from '../../api/tmdbAPI';

const MovieReviews = () => {
  const { movieId } = useParams();  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (movieId) {  
      fetchMovieReviews(movieId).then(setReviews).catch(error => console.error(error));
    }
  }, [movieId]);

  if (!reviews.length) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
