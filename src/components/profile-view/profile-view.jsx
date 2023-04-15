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
      <FavoriteMovies favoriteMovieList={favoriteMovieList}/>
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate}/>
      
    </div>
  );
}
