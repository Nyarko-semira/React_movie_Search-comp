import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";
function MovieCard({ movie }) {
  const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate('/movie-details', { state: { movie} });
//   };
  const handleCardClick = () => {
    // Pass the imdbID via route param or state
    navigate(`/movie-details/${movie.imdbID}`);  
  };

  return (
    <div className='movie' onClick={handleCardClick}>
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;

