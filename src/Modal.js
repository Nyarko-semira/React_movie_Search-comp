import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./App.css";

const API_URL = 'http://www.omdbapi.com?apikey=a6b5d01d';

function Modal() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}&i=${imdbID}&plot=full`);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return <h2>Movie not found</h2>;
  }

  return (
    <div className=' row details'>
      
        <div className='row'>
          <div className='col'>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} className='photos' />
          </div>
          <div className='col'>
            <p className='details-title'> {movie.Title} {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
     
    </div>
  );
}

export default Modal;



