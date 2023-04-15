import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/api/users/${user.Username}`, {
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
      <UserInfo user={user} />
      <UpdateUser user={user} onUpdateUser={handleUpdateUser} />
      <FavoriteMovies movies={favoriteMovieList} />
      <Link to="/">
        <Button className="back-button">Back to Movies</Button>
      </Link>
    </div>
  );
}
