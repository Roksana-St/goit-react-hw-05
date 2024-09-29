import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieItem.module.css';

const MovieItem = ({ movie }) => {
  const location = useLocation();

  return (
    <li className={styles.movieItem}>
      <Link to={`/movies/${movie.id}`} state={{ from: location }}>
        <h3>{movie.title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
    </li>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default MovieItem;

