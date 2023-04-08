import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }  
        fetch("https://tamarflix.herokuapp.com/movies"), {
            headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = data.map((movie) => {
            return {
              id: movie.key,
              title: movie.Title,
              image: movie.ImagePath,
              description: movie.Description,
              genre: movie.Genre,
              director: movie.Director
            };
          });
          setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user) {
        return (
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
        );
      }

  if (selectedMovie) {
    return (
      <>
      <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
        <BookView
          book={selectedBook}
          onBackClick={() => setSelectedBook(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
            <>
              <button
                onClick={() => {
                  setUser(null);
                }}
              >
                Logout
              </button>
              <div>The list is empty!</div>
            </>
          );
        }

        return (
            <div>
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                }}
              >
                Logout
              </button>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              ))}
            </div>
          );
        };
