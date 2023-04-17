import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <>
      <h3>Favorite Movies</h3>
      {favoriteMovieList && favoriteMovieList.length > 0 ? (
        <div className="favorite-movies-container">
          {favoriteMovieList.map((movie) => (
            <Card key={movie._id}>
              <Card.Img variant="top" src={movie.image} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>You have not added any favorite movies yet.</p>
      )}
    </>
  );
}

export function ProfileView({ movies, onUpdateUserInfo }) {
  const [user, setUser] = useState({});

  const favoriteMovieList = Array.isArray(movies) && movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const getUser = async () => {
    try {
      const response = await fetch('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/users/${user?.UserName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setUser(data);
      onUpdateUserInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-view">
      <h2 className="profile-title">Profile</h2>
      {user ? (
        <Card>
          <Card.Body>
            <UserInfo user={user} />
            <UpdateUser user={user} onUpdateUser={handleUpdateUser} />
            <hr />
            {favoriteMovieList.length ? (
              <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            ) : (
              <p>No favorite movies yet.</p>
            )}
            <hr />
            <Link to="/">
              <Button variant="primary">Back to Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
