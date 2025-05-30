import React from 'react';
import { useState, useEffect } from 'react';
import "./App.css";
import "./MovieCard";

import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';


const movie1 = {

  Poster: "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg",
  Title: "Italian Spiderman",
  Type: "movie",
  Year: "2007",
  imdbID: "tt2705436"
}


const API_URL = 'http://www.omdbapi.com?apikey=a6b5d01d';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);



  const searchMovies = async (title) => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setLoading(false);
  }


  useEffect(() => {
    searchMovies('girl');

  }, []);

  return (
    // <div className='app'>
    //   <h1>NetMovie</h1>



    //   <div className='search'>
    //     <input placeholder='search for movies'
    //       value={searchTerm} 
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     ></input>

    //     <img src={SearchIcon}
    //       alt='search'
    //       onClick={() => searchMovies(searchTerm)}
    //     ></img>

    //   </div>


    //   {movies?.length > 0 
    //   ? (
    //       <div className='container'>
    //         {movies.map((movie) => (
    //           <MovieCard movie={movie} />
    //         ))}
    //       </div>
    //     ) : (
    //     <div className='empty'>
    //       <h2>No movies Founds</h2>
    //     </div>
    //     )}
    // </div>

    <div className='app'>
      <h1>NetMovie</h1>

      <div className='search'>
        <input
          placeholder='search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden ">Loading...</span>
          </div>
        </div>
      ) : movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies Found</h2>
        </div>
      )}
    </div>
  );



}

export default App;
