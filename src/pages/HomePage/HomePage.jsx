import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchAllMobi = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError("Movies is not found!");
      } finally {
        setLoading(false);
      }
    };
    fetchAllMobi();
  }, []);

  return (
    <>
      <h2>Treands Movies</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;




