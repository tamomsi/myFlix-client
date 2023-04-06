export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <p><span>Description: </span></p>
          <span>{movie.description}</span>
        </div>
        <div>
          <p><span>Director: </span></p>
          <span>{movie.director.Name}</span>
          <p><span>Biography of the Director:</span></p>
          <span>{movie.director.Bio}</span>
          <p><span>Birth Year:</span></p>
          <span>{movie.director.Birth}</span>
          <p><span>Death Year:</span></p>
          <span>{movie.director.Death}</span>
        </div>
        <div>
          <p><span>Genre: </span></p>
          <span>{movie.genre.Name}</span>
          <p><span>Genre Description:</span></p>
          <span>{movie.genre.Description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  