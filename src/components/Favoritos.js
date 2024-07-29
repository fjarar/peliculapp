import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Favoritos = (props) => {
  let token = sessionStorage.getItem("token");

  return (
    <>
      {!token && <Navigate to="/" />}
      <h2>Seccion favoritos</h2>
      <div className="row">
        {!props.favorites.length && (
          <>
            <div className="col-12 text-danger">
              No hay favoritos para mostrar.
            </div>
          </>
        )}
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/original/${oneMovie.imgURL}`}
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

export default Favoritos;
