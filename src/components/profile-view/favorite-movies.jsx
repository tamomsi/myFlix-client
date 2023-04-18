import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const FavoriteMovies = ({ movies, favorites, onAddFavorite, onRemoveFavorite }) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch("/movies")
      .then(response => response.json())
      .then(data => setMovieData(data))
      .catch(error => console.log(error));
  }, []);  

  return (
    <div>
      <h2>Favorite Movies</h2>
      {movieData && movieData.filter(movie => favorites.includes(movie.id)).map((movie) => (
        <div key={movie.id}>
          <img src={movie.ImagePath} alt="" />
          <Link to={`/movies/${movie.id}`}>
            <h4>{movie.Title}</h4>
          </Link>
          <Button variant="secondary" onClick={() => onRemoveFavorite(movie.id)}>
            Remove from list
          </Button>
        </div>
      ))}
    </div>
  )}