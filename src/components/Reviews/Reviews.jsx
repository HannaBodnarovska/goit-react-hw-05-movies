import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Reviews.module.css';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = '18ff5e266d356991087394c727a30345';
    axios.get(`/movies/get-movie-reviews/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        setReviews(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Помилка отримання оглядів:', error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Завантаження оглядів...</div>;
  }

  return (
    <div className={styles.reviewsContainer}>
      <h2>Огляди</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Огляди відсутні.</p>
      )}
    </div>
  );
}

export default Reviews;
