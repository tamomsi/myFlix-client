import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
              director: movie.Director
            }));
            setMovies(moviesFromApi);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [token]);

      return (
        <Row> 
          {!user ? (
            <>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              or
              <SignupView />
            </>
          ) : selectedMovie ? (
            <>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
              <MovieView 
                movie={selectedMovie} 
                onBackClick={() => setSelectedMovie(null)} 
              />
            </>
          ) : movies.length === 0 ? (
            <>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                }}
              >
                Logout
              </Button>
              <div>The list is empty!</div>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                }}
              >
                Logout
              </Button>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              ))}
            </>
          )}
        </Row>
      );
