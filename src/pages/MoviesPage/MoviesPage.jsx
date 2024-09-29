import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') || '';

  const handleSearch = async (event) => {
    event.preventDefault();
    const form = event.target;
    const searchQuery = form.elements.search.value;

    setSearchParams({ query: searchQuery });
    
    if (searchQuery) {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    }
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;

