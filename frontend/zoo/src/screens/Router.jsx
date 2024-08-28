import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoPage from "./NoPage.jsx";
import Listar from "./Listar.jsx";
import Editar from "./Editar.jsx";
import Crear from "./Crear.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listar />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
