import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
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
          director: movie.Director,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
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
<Col md={1} className="mb-.25">
  or
</Col>
<Col md={4} className="mb-1.5">
  <SignupView className="form" />
</Col>
        </>
      ) : selectedMovie ? (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </>
      ) : movies.length === 0 ? (
        <>
          <div>The list is empty!</div>
        </>
      ) : (
        <>
          <Col xs={12} className="mb-1.5">
  <div style={{ textAlign: "right" }}>
    <Button onClick={() => { setUser(null); setToken(null); }}>
      Logout
    </Button>
  </div>
</Col>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-5">
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};