import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../../api/tmdbAPI';
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovieCredits(movieId)
      .then(setCast)
      .catch(() => {
        setError("Failed to load cast. Please try again later!");
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  // }
  if (error) {
    return <p>{error}</p>;
  }
  if (cast.length === 0) {
    return <p>No cast available for this movies</p>;
    }

  return (
    <>
      {loading && <p>Loading...</p>}
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default MovieCast;
