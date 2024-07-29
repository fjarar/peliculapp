import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const Buscador = () => {
  const swal = withReactContent(Swal);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swal.fire({
        title: <p>Tienes que escribir una palabra clave</p>,
        icon: "warning",
      });
    } else if (keyword.length < 4) {
      swal.fire({
        title: <p>Debe escribir 4 o más caracteres</p>,
        icon: "warning",
      });
    }else{
        e.currentTarget.keyword.value = '';
        navigate(`/resultados?keyword=${keyword}`);
    }
  };
  return (
    <form className="d-flex align-item-center" onSubmit={submitHandler} >
      <label className="form-label mb-0 mx-2" htmlFor="keyword">
        <input
          className="form-control"
          type="text"
          name="keyword"
          placeholder="Ingrese un texto a buscar..."
        />
      </label>
      <button className="btn btn-success" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default Buscador;
