import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./App.css";
import { FaDownload } from 'react-icons/fa';
import { RiMovie2Line } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { MdIosShare } from "react-icons/md";



const API_URL = 'http://www.omdbapi.com?apikey=a6b5d01d';


function Modal() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);

  const backgroundImage = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400';
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
    <>
      <div className='div-photo' style={{

        backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '50vh'

      }}>
      </div>
      <div className='contain'>
        <div className=''>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
            alt={movie.Title}
            className='img-fluid small-photos'
          />
        </div>

        <div className='details'>
          <p className='details-title'>{movie.Title} <span className='span-title'>({movie.Year})</span></p>
          <p><span className='span-director'>Director by {movie.Director}</span></p>
          <p className='rating'><strong>IMDB Rating:</strong> <span className='span-rating'>{movie.imdbRating}</span></p>
          <div className='watchlista'>
            <button> <FaDownload /> Add to watchlist</button>

            <div className='icons'>
              <RiMovie2Line />
              <CiCircleCheck />
              <MdIosShare />
            </div>
          </div>

          <p className='genre'><strong >Genre:</strong> {movie.Genre}</p>
          <p className='actor'><strong>Actors:</strong> <span className='actor-details'> {movie.Actors}</span></p>
          <p className='plot'><strong>Plot:</strong> {movie.Plot}</p>
          <p className='language'><strong>Language:</strong> {movie.Language}</p>
          <p className='country'><strong>Country:</strong> {movie.Country}</p>
          <p className='awards'><strong>Awards:</strong> {movie.Awards}</p>
        </div>
      </div>
    </>
  );
}

export default Modal;



