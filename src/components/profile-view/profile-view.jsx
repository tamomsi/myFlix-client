import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdateUserInfo }) {
  const [user, setUser] = useState({});

  const favoriteMovieList = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const getUser = async () => {
    try {
      const response = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      onUpdateUserInfo(data);
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };
  

  const removeFav = async (id) => {
    try {
      const response = await fetch(`/api/users/${user._id}/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        FavoriteMovies: data.FavoriteMovies,
      }));
    } catch (error) {
      console.error('Failed to remove favorite movie:', error);
    }
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserInfo name={user.UserName} email={user.Email} />
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt="" />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <Button
              variant="secondary"
              onClick={() => removeFav(movie._id)}
            >
              Remove from list
            </Button>
          </div>
        );
      })}
      <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Want to change some info?</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.UserName}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue={user.Password}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            defaultValue={user.Email}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
