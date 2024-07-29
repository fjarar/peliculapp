import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Detalle = () => {
  let token = sessionStorage.getItem("token");
  const swal = withReactContent(Swal);

  let query = new URLSearchParams(window.location.search);
  let movieId = query.get("id");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQ5MDZmYTU1YzA2ZmE5MWM5NzJmZWE5MTVkZDU4NyIsIm5iZiI6MTcyMTg1MDg1NC4xOTMxMzgsInN1YiI6IjYzMWI0ZTE5NzdiMWZiMDA4OGZlYjllNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NodQBRDKM5hruZkT4DU1NsHX8Xo4ZoS4Tw36QngLXNg",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        swal.fire({
          title: (
            <>
              <h2>Se a presentado un error al cargar los datos.</h2>
              <p>Por favor intente más tarde</p>
            </>
          ),
          icon: "warning",
        });
      });
  }, [setMovie]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="img-fluid"
                alt="Imagen pelicula"
              />
            </div>
            <div className="col-8">
              <h5>Fecha de Estreno: {movie.release_date}</h5>
              <h5>Reseña: </h5>
              <p>{movie.overview}.</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Géneros: </h5>
              <ul>
                {movie.genres.map((genero) => (
                  <li key={genero.id}>{genero.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;
