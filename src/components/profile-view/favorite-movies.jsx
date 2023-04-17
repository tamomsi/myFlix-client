import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const FavoriteMovies = ({ movies, favorites, onAddFavorite, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {movies.map((movie) => {
        if (favorites.includes(movie._id)) {
          return (
            <div key={movie._id}>
              <img src={movie.ImagePath} alt="" />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <Button variant="secondary" onClick={() => onRemoveFavorite(movie._id)}>
                Remove from list
              </Button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
