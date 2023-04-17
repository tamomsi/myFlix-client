import React, { useState, useEffect } from "react";

export const UserInfo = ({ email, name, birthday }) => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        const loggedInUser = data.find(u => u.UserName === "your-UserName");
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error);
      });

    fetch("/movies")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAddFavorite = (movieId) => {
    setFavorites(prevFavorites => [...prevFavorites, movieId]);
  }

  const handleRemoveFavorite = (movieId) => {
    setFavorites(prevFavorites => prevFavorites.filter(id => id !== movieId));
  }

  const getUser = () => {
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        birthday: user.birthday
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <>
      <p>User: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" value={user.email || ""} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={user.name || ""} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="birthday">Birthday:</label>
        <input type="text" name="birthday" value={user.birthday || ""} onChange={handleInputChange} />
      </div>
      <button onClick={getUser}>Update User Info</button>
      <FavoriteMovies
        movies={movies}
        favorites={favorites}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </>
  );
};
