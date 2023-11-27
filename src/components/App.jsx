import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import styles from './App.module.css';

const Movies = React.lazy(() => import('./Movies/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));


function App() {
  return (
    <BrowserRouter basename="/goit-react-hw-05-movies"> 
      <div className={styles.appContainer}>
        <nav className={styles.navbar}>
          <ul className={styles.navbarList}>
            <li className={styles.navbarItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Suspense fallback={<div>Loading...</div>}><Movies /></Suspense>} />
          <Route path="/movies/:movieId/*" element={<Suspense fallback={<div>Loading...</div>}><MovieDetails /></Suspense>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
