import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
      return <p>No movies found.</p>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired, 
};

export default MovieList;




