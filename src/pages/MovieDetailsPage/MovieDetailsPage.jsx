import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbAPI';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={styles.movieDetailsPage}>
      <Link to={backLink.current}>Go back</Link>
      <div className={styles.movieInfo}>
        <img src={imageUrl} alt={movie.title} className={styles.moviePoster} />
        <div className={styles.movieText}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>

      <nav>
        <Link to="cast" className={styles.cast}>Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>

      <Outlet /> 
    </div>
  );
};

export default MovieDetailsPage;


