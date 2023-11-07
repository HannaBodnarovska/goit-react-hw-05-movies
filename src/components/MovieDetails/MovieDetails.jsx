import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetails.module.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => {
        setMovieDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Помилка отримання даних про фільм:', error);
        setLoading(false);
      });
  }, [movieId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <Link to="/" className={styles.goBackButton}>
        Go Back
      </Link>
      <div className={styles.movieInfo}>
        <div className={styles.moviePoster}>
          <img src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`} alt={movieDetails.title} />
        </div>
        <div className={styles.movieDescription}>
          <h1>{movieDetails.title}</h1>
          <div className={styles.overviewContent}>
            <h2>Overview</h2>
            {movieDetails.overview}
          </div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'cast' ? styles.active : ''}`}
              onClick={() => handleTabClick('cast')}
            >
              Actors
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'cast' && (
              <>
                <h2>Cast</h2>
                <Cast movieId={movieId} />
              </>
            )}
            {activeTab === 'reviews' && (
              <>
                <h2>Reviews</h2>
                <Reviews movieId={movieId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
