import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then(response => {
        setTrendingMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Popular Movies</h1>
      <div className={styles.movieList}>
        {trendingMovies.map(movie => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className={`${styles.movieItem} ${selectedMovie === movie.id ? styles.active : ''}`}
            onMouseEnter={() => setSelectedMovie(movie.id)}
            onMouseLeave={() => setSelectedMovie(null)}
          >
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
