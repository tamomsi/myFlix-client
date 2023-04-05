import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Titanic",
      description: "Titanic is a 1997 American epic romance and disaster film directed, written, produced, and co-edited by James Cameron. Incorporating both historical and fictionalised aspects, it is based on accounts of the sinking of the RMS Titanic and stars Kate Winslet and Leonardo DiCaprio as members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png?20190508145520",
      director: "James Francis Cameron",
      genre: "Romance"
    },
    {
      id: 2,
      title: "Brokeback Mountain",
      description: "Brokeback Mountain is a 2005 American neo-Western romantic drama film directed by Ang Lee and produced by Diana Ossana and James Schamus. The film stars Heath Ledger, Jake Gyllenhaal, Anne Hathaway, and Michelle Williams and depicts the complex romantic relationship between two American cowboys, Ennis Del Mar and Jack Twist, in the American West from 1963 to 1983.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/a/a1/Brokeback_mountain.jpg?20160109003759",
      director: "Ang Lee",
      genre: "Drama"
    },
    {
      id: 3,
      title: "Carol",
      description: "Set in New York City during the early 1950s, Carol tells the story of a forbidden affair between an aspiring female photographer and an older woman going through a difficult divorce.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/10/Carol_film_poster.jpg?20161224155611",
      director: "Todd Haynes",
      genre: "Drama"
    },
    {
      id: 4,
      title: "Home Alone",
      description: "It is Christmas time and the McCallister family is preparing for a vacation in Paris, France. But the youngest in the family, Kevin (Macaulay Culkin), got into a scuffle with his older brother Buzz (Devin Ratray) and was sent to his room, which is on the third floor of his house. Then, the next morning, while the rest of the family was in a rush to make it to the airport on time, they completely forgot about Kevin, who now has the house all to himself.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg?20170303210933",
      director: "Chris Columbus",
      genre: "Family"
    },
    {
      id: 5,
      title: "The Holiday",
      description: "The Holiday is a 2006 romantic comedy film written, produced and directed by Nancy Meyers. Coproduced by Bruce A. Block, it was filmed in both California and England and stars Kate Winslet and Cameron Diaz as Iris and Amanda, two lovelorn women from opposite sides of the Atlantic Ocean, who arrange a home exchange to escape heartbreak during the Christmas and holiday season.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/60/Theholidayposter.jpg?20171216233620",
      director: "Nancy Meyers",
      genre: "Comedy"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }

  return (
    <div>
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
