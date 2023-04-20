import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite }) => {
  let favorites = JSON.parse(localStorage.getItem('user')).FavoriteMovies;

  return (
    <div className="fav-movie-container">
      <h2 className="my-custom-class">Favorite Movies</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies &&
          movies
            .filter((movie) => favorites.includes(movie.id))
            .map((movie) => (
              <Col key={movie.id}>
                <Card className="h-100">
                  <Card.Img className="movie-card-img" variant="top" src={movie.image} alt="" />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                      </Link>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};