import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

  export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };
  
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string,
        death: PropTypes.string
    }).isRequired 
}).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
