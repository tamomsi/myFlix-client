import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies, onAddToFavorites }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const [inFavorites, setInFavorites] = useState(false);

  const handleAddToFavoritesClick = () => {
    onAddToFavorites(movieId);
    setInFavorites(true);
  }

  return (
    <div className="movie-view">
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/directors/${movie.director}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.genre}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button
            variant={inFavorites ? "secondary" : "primary"}
            onClick={handleAddToFavoritesClick}
            disabled={inFavorites}
          >
            {inFavorites ? "Added to Favorites" : "Add to Favorites"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
