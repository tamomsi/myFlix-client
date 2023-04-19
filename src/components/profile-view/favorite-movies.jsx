import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite }) => {
  let favorites = JSON.parse(localStorage.getItem('user')).FavoriteMovies;

  return (
    <div>
      <h2>Favorite Movies</h2>
      <Row>
        {movies &&
          movies
            .filter((movie) => favorites.includes(movie.id))
            .map((movie) => (
              <Col md={4} key={movie.id}>
                <Card>
                  <Card.Img variant="top" src={movie.image} alt="" />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                      </Link>
                    </Card.Title>
                    {onRemoveFavorite && (
                      <Button
                        variant="secondary"
                        onClick={() => onRemoveFavorite(movie.id)}
                      >
                        Remove from list
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};
