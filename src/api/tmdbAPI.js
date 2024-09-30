import axios from 'axios';

const API_KEY = 'b3267131c8acb897935c7ebe023c7ff1';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzI2NzEzMWM4YWNiODk3OTM1YzdlYmUwMjNjN2ZmMSIsIm5iZiI6MTcyNzU2NjcxNC4xNjAwMzIsInN1YiI6IjY2Zjg5MDhiYTYyOTNlM2Q3NmEyMjdmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D9lh71FiVpkKiBhcStgGs5mQfms0rHAKoAZ8weGhGSM",
  },
};



export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    options
  );
  return response.data.results;
};

// export const searchMovies = async (query) => {
//   const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
//       query
//     )}&include_adult=false&language=en-US&page=1`,
//     options
//   );
//   return response.data.results;
// };



export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};



export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
    options
  );
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?language=en-US&page=1&api_key=${API_KEY}`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
    options
  );
  return response.data.results;
};
