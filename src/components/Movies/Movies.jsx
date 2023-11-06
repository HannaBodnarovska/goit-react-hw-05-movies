import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Movies.module.css';

function Movies() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchKeyword.trim() === '') return;

    const API_KEY = '18ff5e266d356991087394c727a30345';
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKeyword}`;

    axios.get(searchUrl)
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Помилка отримання даних:', error);
      });
  };

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

    axios.get(trendingUrl)
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Помилка отримання даних:', error);
      });
  }, []);

  return (
    <div className={styles.moviesContainer}>
      <h1>Пошук фільмів</h1>
      <input
        type="text"
        placeholder="Пошук фільмів"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Пошук</button>
      <div className={styles.searchResults}>
        {searchResults.map((movie) => (
          <div key={movie.id} className={styles.movieItem}>
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
