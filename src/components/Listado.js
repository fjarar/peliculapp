import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Listado = (props) => {
  let token = sessionStorage.getItem("token");
  const swal = withReactContent(Swal);

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "es-ES",
        page: "1",
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQ5MDZmYTU1YzA2ZmE5MWM5NzJmZWE5MTVkZDU4NyIsIm5iZiI6MTcyMTg1MDg1NC4xOTMxMzgsInN1YiI6IjYzMWI0ZTE5NzdiMWZiMDA4OGZlYjllNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NodQBRDKM5hruZkT4DU1NsHX8Xo4ZoS4Tw36QngLXNg",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const apiData = response.data;
        setMoviesList(apiData.results);
      })
      .catch(function (error) {
        console.error(error);
        swal.fire({
          title: <h2>Hubo errores. Intente más tarde.</h2>,
          icon: "error",
        });
      });
  }, [setMoviesList]);
  return (
    <>
      {!token && <Navigate to="/" />}

      <div className="row g-4 card-group">
        {moviesList.map((oneMovie, idx) => {
          return (
            <div className="col-lg-3 col-md-4 p-2" key={idx}>
              <div className="card h-100 my-4">
                <img
                  src={`https://image.tmdb.org/t/p/original/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}...
                  </h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/detalle?id=${oneMovie.id}`}
                    className="btn btn-primary w-100"
                  >
                    View detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listado;
