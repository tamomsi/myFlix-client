import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    if (Array.isArray(onAddToFavorites) && onAddToFavorites.some((m) => m.id === movie.id)) {
      onAddToFavorites(movie);
      setIsFavorite(true);
    }
  };

  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    if (Array.isArray(onRemoveFromFavorites) && onRemoveFromFavorites.some((m) => m.id === movie.id)) {
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
          {isFavorite ? (
            <Button
              variant="danger"
              className="favorite-button"
              onClick={handleRemoveFromFavorites}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              variant="primary"
              className="favorite-button"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </Button>
          )}
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
