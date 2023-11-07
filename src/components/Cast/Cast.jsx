import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Cast.module.css';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(response => {
        setCast(response.data.cast);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cast data:', error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading cast...</div>;
  }

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
              <h3>{actor.name}</h3>
              <p>Role: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cast is not available.</p>
      )}
    </div>
  );
}

export default Cast;
