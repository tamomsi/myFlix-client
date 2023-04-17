import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Footer } from "../navigation-bar/footer";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("https://tamarflix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // This will clear all the items in localStorage
  };

  const handleAddToFavorites = (movieId) => {
    console.log('movieId:', movieId);
    console.log('movies:', movies);
  
    if (movies.length === 0) {
      // If movies is empty, fetch the movies from the API again
      fetch("https://tamarflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((movies) => {
          const moviesFromApi = movies.map((movie) => ({
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director,
          }));
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
  
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    console.log('movieToAdd:', movieToAdd);
  
    if (favorites && favorites.some((movie) => movie.id === movieId)) {
        console.log(`Movie with id ${movieId} is already in favorites.`);
      } else if (movieToAdd) {
      setFavorites([...favorites, movieToAdd]);
      fetch(`https://tamarflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert('Movie successfully added to favorites list.');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error adding the movie to favorites list.');
        });
    } else {
      alert('This movie is already in your favorites list.');
    }
  };  
  
  const handleRemoveFromFavorites = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    fetch(`https://tamarflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  const handleFavoriteClick = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    if (!favorites.some((movie) => movie.id === movieId)) {
      setFavorites([...favorites, movieToAdd]);
      fetch(`https://tamarflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    }
  } 
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout}/>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <>
                  <Col md={4} className="mb-1.5">
                    <LoginView
                      className="form"
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                  <Col md={1} className="mb-.25" style={{ margin: '50px 0' }}>
                    or
                  </Col>
                  <Col md={4} className="mb-1.5">
                    <SignupView className="form" />
                  </Col>
                </>
              ) : movies.length === 0 ? (
                <>
                  <div>The list is empty!</div>
                </>
              ) : (
                <>
                  <Col xs={12} className="mb-1.5">
                  </Col>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-5">
                      <MovieCard movie={movie} 
                      onAddToFavorites={(movieId) => handleAddToFavorites(movieId)} 
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/movies/:movieId" 
            element={<MovieView movies={movies} />}
          />
          <Route 
            path="/users/:UserName"
            element={<ProfileView user={user} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Row>
      <Footer/>
    </BrowserRouter>
  );
};
