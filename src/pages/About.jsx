import React from 'react';
import './About.css';

const favoriteMovies = [
  'Interstellar',
  'La Piscine',
  'La La Land',
  'Inception',
  'Django Unchained',
  'Mulholland Drive',
  'Shawshank Redemption',
  'Fight Club',
  'La Haine',
  'Zoolander',
  'Chinatown',
  'Inglorious Basterds',
  'Memento',
  'Marty Supreme',
  'The Big Short',
];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-copy">
        <p>
          Human from planet earth who wants the human race to endure
        </p>
      </section>

      <section className="about-movies">
        <h2>I love a good film, here are some of my favorites (no particular order)</h2>
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie}>{movie}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default About;
