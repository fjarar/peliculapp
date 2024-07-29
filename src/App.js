import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

// styles
import "./css/bootstrap.min.css";
import "./css/app.css";


const App = () => {
  const favMovies = localStorage.getItem("favs");

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal);
      console.log(favsArray);
      setFavorites(favsArray);
    }
  }, []);

  let tempMoviesInFavs;

  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Pelicula agregada a favoritos");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Pelicula eliminada de favoritos");
    }
  };
  return (
    <>
      <Header favorites={favorites} />
      <div className="container mt-3 d-flex flex-column pb-5">
        <Routes className="main-content">
          <Route exact path="/" element={<Login />} />
          <Route
            path="/listado"
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route
            path="/favoritos"
            element={
              <Favoritos
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
