import React from "react";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favoriteMovieList, removeFav }) => {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt="" />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <Button
              variant="secondary"
              onClick={() => removeFav(movie._id)}
            >
              Remove from list
            </Button>
          </div>
        );
      })}
    </div>
  );
};
