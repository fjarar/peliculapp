import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Listado from "./Listado";

function Login() {
  const navigate = useNavigate();
  const swal = withReactContent(Swal);

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      swal.fire({
        title: <h2>Los campos no pueden estar vacios</h2>,
        icon: "error",
      });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swal.fire({
        title: <h2>Debes escribir un correo electronico valido</h2>,
        icon: "warning",
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal.fire({
        title: <h2>Credenciales no válidas</h2>,
        icon: "error",
      });
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigate("/listado");
      });
  };

  let token = sessionStorage.getItem("token");
  return (
    <>
      {token && <Navigate to="/listado" />}
      <div className="row g-4">
        <div className="col-6 offset-3">
          <h2>Formulario de Login</h2>
          <form className="h-100 my-4" onSubmit={submitHandler}>
            <label className="form-label d-block mt-2" htmlFor="email">
              <span>Correo electrónico:</span>
              <br />
              <input className="form-control" type="text" name="email" />
            </label>
            <br />
            <label className="form-label d-block mt-2" htmlFor="password">
              <span>Contraseña:</span>
              <br />
              <input className="form-control" type="password" name="password" />
            </label>
            <button className="btn btn-success mt-2" type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
