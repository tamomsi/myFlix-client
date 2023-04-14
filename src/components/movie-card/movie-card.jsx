import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';
import { Link } from "react-router-dom";

  export const MovieCard = ({ movie, onMovieClick }) => {
         const maxDescriptionLength = 100; // set the maximum length of the truncated description
         const truncatedDescription = movie.description.length > maxDescriptionLength
          ? `${movie.description.substring(0, maxDescriptionLength)}...`
          : movie.description; // check if the length of the description exceeds the maximum length, and truncate it if necessary

    return (
      <Card className="h-100">
        <Card.Img 
        className="movie-card-img"
        variant="top" 
        src={movie.image} 
        alt={movie.title} 
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{truncatedDescription}</Card.Text>
          <Button 
          onClick={() => onMovieClick(movie)} 
          variant="link">
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
