import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await searchMovies(query);
          setMovies(data.results || []); 
        } catch (error) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchQuery = form.elements.search.value.trim();

    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

          {query && !movies.length && <p>No movies found</p>}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;



