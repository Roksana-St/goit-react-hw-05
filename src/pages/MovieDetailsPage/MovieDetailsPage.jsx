import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbAPI';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.movieDetails}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <Link to={location.state?.from ?? '/movies'}>Go back</Link>

      <div className={styles.additionalLinks}>
        <Link to="cast" className={styles.cast}>Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;

