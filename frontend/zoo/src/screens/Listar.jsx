import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_API_URL;

const Listar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${ApiUrl}/animals`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    // Realiza la solicitud DELETE a la API
    fetch(`${ApiUrl}/animals/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Si la eliminación es exitosa, actualiza el estado para eliminar el animal
          setData(data.filter((animal) => animal._id !== id));
        } else {
          console.error("Error al eliminar el animal");
        }
      })
      .catch((error) => console.error("Error en la solicitud DELETE:", error));
  };

  return (
    <>
      <h1>Listar animales</h1>
      <button>
        <Link to='/crear'>Crear nuevo animal</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Edad</th>
            <th>Comida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((animal, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{animal.nombre}</td>
              <td>{animal.especie}</td>
              <td>{animal.edad}</td>
              <td>{animal.comida}</td>
              <td>
                <button>
                  <Link to={`/editar/${animal._id}`}>Editar</Link>
                </button>
                <button onClick={() => handleDelete(animal._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Listar;
