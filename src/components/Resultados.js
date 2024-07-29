import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link, useLocation } from "react-router-dom";

const Resultados = () => {
  const location = useLocation();
  let query = new URLSearchParams(location.search);
  let keyword = query.get("keyword");
  let token = sessionStorage.getItem("token");

  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    if (!keyword) return;

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${keyword}`,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQ5MDZmYTU1YzA2ZmE5MWM5NzJmZWE5MTVkZDU4NyIsIm5iZiI6MTcyMjAwOTM4My4wODEwNzYsInN1YiI6IjYzMWI0ZTE5NzdiMWZiMDA4OGZlYjllNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7KDuDWFDZd186vvYuL4qTCJH5RSaE5Pfy16G0np9zgg",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(keyword);
        setMovieResults(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [keyword]);

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {!movieResults && <p>Cargando...</p>}
      {movieResults && (
        <>
          <h2>
            Buscaste: <em>{keyword}</em>
          </h2>
          {movieResults.length === 0 && (
            <h3>No hay resultado para la busqueda solicitada.</h3>
          )}
          <div className="row g-4 card-group">
            {movieResults.map((movie, idx) => {
              return (
                <div className="col-lg-3 col-md-4 p-2" key={idx}>
                  <div className="card h-100 my-4">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {movie.title.substring(0, 30)}...
                      </h5>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={`/detalle?id=${movie.id}`}
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
      )}
    </>
  );
};

export default Resultados;
