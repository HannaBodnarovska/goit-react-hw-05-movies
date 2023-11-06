import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Cast.module.css';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`/movies/get-movie-credits/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        setCast(response.data.cast);
        setLoading(false);
      })
      .catch(error => {
        console.error('Помилка отримання даних про акторський склад:', error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Завантаження акторського складу...</div>;
  }

  return (
    <div className={styles.castContainer}>
      <h2>Акторський склад</h2>
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
              <p>Роль: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Акторський склад відсутній.</p>
      )}
    </div>
  );
}

export default Cast;
