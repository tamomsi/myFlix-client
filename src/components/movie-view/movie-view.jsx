import React from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movieProp }) => {
    const { movieId } = useParams();

    const movie = movies.find((b) => b.id === movieId);

    return (
        <div className="movie-view-container">
            <Card className="movie-card">
                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Card.Text>Director: {movie.director.Name}</Card.Text>
                    <Card.Text>Biography of the Director: {movie.director.Bio}</Card.Text>
                    <Card.Text>Birth Year: {movie.director.Birth}</Card.Text>
                    <Card.Text>Death Year: {movie.director.Death}</Card.Text>
                    <Card.Text>Genre: {movie.genre.Name}</Card.Text>
                    <Card.Text>Genre Description: {movie.genre.Description}</Card.Text>
                    <Link to={`/`}>
                        <Button className="back-button" variant="primary">
                            Back
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};