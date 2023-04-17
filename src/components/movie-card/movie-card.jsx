import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './movie-card.scss';

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites }) => {
  const maxDescriptionLength = 100;
  const truncatedDescription =
    movie.description.length > maxDescriptionLength
      ? `${movie.description.substring(0, maxDescriptionLength)}...`
      : movie.description;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie.id); 
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie);
    setIsFavorite(false);
    axios.delete(`https://myflixdb247.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      console.log(response);
      alert('Movie successfully removed from favorites list.');
    })
    .catch(error => {
      console.log(error);
      alert('There was an error removing the movie from favorites list.');
    });
  };  

  const handleFavoriteClick = (event) => { //add a new function to handle favorite button click
    event.preventDefault();
    if (isFavorite) {
      handleRemoveFromFavorites(event);
    } else {
      handleAddToFavorites(event);
    }
  };

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
        <div className="button-group">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button
            className="favorite-button"
            variant={isFavorite ? 'danger' : 'outline-danger'}
            onClick={handleFavoriteClick} //use handleFavoriteClick for favorite button click
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
      death: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};
