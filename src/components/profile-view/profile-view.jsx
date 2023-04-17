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

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://tamarflix.herokuapp.com/users/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(response.data);
      setFavorites(response.data.FavoriteMovies);
    } catch (e) {
      console.log(e);
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

  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    if (!favorites.some((movie) => movie.id === movieId)) {
      setFavorites([...favorites, movieToAdd]);
      axios
        .post(
          `https://tamarflix.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };  

  return (
    <div className="profile-view">
      <h1 className="profile-title">Profile</h1>
      {user.UserName ? (
        <Card className="profile-card">
          <Card.Body>
            <UserInfo user={user} />
            <UpdateUser user={user} onUpdateUser={handleUpdateUser} />
            <hr />
            {user.FavoriteMovies && user.FavoriteMovies.length > 0 ? (
              <FavoriteMovies movies={movies} userFavoriteMovies={user.FavoriteMovies} />
            ) : (
              <p>No favorite movies yet.</p>
            )}
            <hr />
            <Link to="/">
              <Button className="back-button" variant="primary">Back to Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>No user information found.</p>
      )}
    </div>
  );
}
