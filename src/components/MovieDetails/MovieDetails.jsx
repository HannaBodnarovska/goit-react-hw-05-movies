import React, { useState, useEffect, lazy } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetails.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        setMovieDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Помилка отримання даних:', error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <h1>{movieDetails.title}</h1>
      <div className={styles.tabs}>
        <Link to={`/movies/${movieId}/cast`} className={styles.tab}>Актори</Link>
        <Link to={`/movies/${movieId}/reviews`} className={styles.tab}>Огляди</Link>
      </div>
      <Routes>
        <Route path="/cast" element={<Cast />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetails;

