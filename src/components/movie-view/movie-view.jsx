import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text>Director: {movie.director.Name}</Card.Text>
        <Card.Text>Biography of the Director: {movie.director.Bio}</Card.Text>
        <Card.Text>Birth Year: {movie.director.Birth}</Card.Text>
        <Card.Text>Death Year: {movie.director.Death}</Card.Text>
        <Card.Text>Genre: {movie.genre.Name}</Card.Text>
        <Card.Text>Genre Description: {movie.genre.Description}</Card.Text>
        <Button onClick={onBackClick} className="back-button" variant="primary">
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};
