import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_API_URL;

const Crear = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mombre: "",
        especie:"",
        edad:"",
        comida: ""
    });

    const handleChange = (e) => {
        const {value, name} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar los datos al backend Flask
            const response = await fetch(`${ApiUrl}/animals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Animal creado con éxito!");
                // Reiniciar el formulario si es necesario
                setFormData({
                    nombre: "",
                    especie: "",
                    edad: "",
                    comida: ""
                });
                navigate('/');
            } else {
                alert("Hubo un error al crear el animal.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

  return (
    <>
            <h1>Crear</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del animal</label>
                    <input
                        name="nombre"
                        placeholder="Nombre del animal"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Especie del animal:</label>
                    <input
                        name="especie"
                        placeholder="Especie del animal"
                        value={formData.especie}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Edad del animal:</label>
                    <input
                        name="edad"
                        placeholder="Edad del animal"
                        value={formData.edad}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Comida del animal:</label>
                    <input
                        name="comida"
                        placeholder="Comida del animal"
                        value={formData.comida}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
    </>
  );
};

export default Crear;
