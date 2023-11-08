import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

function Movies() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      setSearchResults([]);
      return;
    }

    const API_KEY = '18ff5e266d356991087394c727a30345';
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKeyword}`;

    axios.get(searchUrl)
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className={styles.moviesContainer}>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search Movies"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className={styles.searchResults}>
        {searchResults.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className={styles.movieItem}>
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;

