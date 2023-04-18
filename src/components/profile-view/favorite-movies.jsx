import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite }) => {

let favorites =JSON.parse(localStorage.getItem('user')).FavoriteMovies

  return (
    <div>
      <h2>Favorite Movies</h2>
      {movies && movies.filter(movie => favorites.includes(movie.id)).map((movie) => (
        <div key={movie.id}>
          <img src={movie.image} alt="" />
          <Link to={`/movies/${movie.id}`}>
            <h4>{movie.title}</h4>
          </Link>
          <Button variant="secondary" onClick={() => onRemoveFavorite(movie.id)}>
            Remove from list
          </Button>
        </div>
      ))}
    </div>
  )}