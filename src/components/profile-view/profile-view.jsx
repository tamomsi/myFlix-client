import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({movies }) => {
  const [user, setUser] = useState({movies});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const loggedInUser = data.find((u) => u.UserName === "your-UserName");
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/movies")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      console.log('Previous favorites:', prevFavorites);
      const updatedFavorites = [...prevFavorites, movieId];
      console.log('Updated favorites:', updatedFavorites);
      return updatedFavorites;
    });
  };
  
  const handleRemoveFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      console.log('Previous favorites:', prevFavorites);
      const updatedFavorites = prevFavorites.filter((id) => id !== movieId);
      console.log('Updated favorites:', updatedFavorites);
      return updatedFavorites;
    });
  };  

  const updateUser = (updatedUser) => {
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: updatedUser.email,
        name: updatedUser.name,
        birthday: updatedUser.birthday,
        UserName: updatedUser.UserName,
        password: updatedUser.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserInfoChange = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <>
      <h1>Profile</h1>
      <Container>
        <Row>
          <Col md={6}>
            <UserInfo
              email={user.email}
              name={user.name}
              birthday={user.birthday}
              onUserChange={handleUserInfoChange}
            />
            <UpdateUser user={user} handleSubmit={updateUser} />
          </Col>
          <Col md={6}>
            <FavoriteMovies
              movies={movies}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};