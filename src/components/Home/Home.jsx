import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Додайте імпорт Link
import styles from './Home.module.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then(response => {
        setTrendingMovies(response.data.results);
      })
      .catch(error => {
        console.error('Помилка отримання даних:', error);
      });
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Популярні фільми</h1>
      <div className={styles.movieList}>
        {trendingMovies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className={styles.movieItem}>  {/* Додайте посилання на сторінку деталей */}
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
