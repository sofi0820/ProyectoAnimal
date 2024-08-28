import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_API_URL;

const Editar = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtiene el ID del animal desde la URL

    const [formData, setFormData] = useState({
        _id: "",
        nombre: "",
        especie: "",
        edad: "",
        comida: ""
    });

    useEffect(() => {
        // Cargar los datos del animal existente cuando el componente se monte
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`${ApiUrl}/animals/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Llenar el formulario con los datos del animal
                } else {
                    alert("Error al cargar los datos del animal.");
                }
            } catch (error) {
                console.error("Error al cargar los datos del animal:", error);
            }
        };

        fetchAnimalData();
    }, [id]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Crea una copia de formData sin el campo _id
        const { _id, ...dataWithoutId } = formData;
    
        try {
            const response = await fetch(`${ApiUrl}/animals/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataWithoutId),  // Envía los datos sin el _id
            });
    
            if (response.ok) {
                alert("Animal actualizado con éxito!");
                navigate('/');
            } else {
                alert("Hubo un error al actualizar el animal.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };
    

    return (
        <>
            <h1>Editar Animal</h1>
            <form onSubmit={handleSubmit}>
                <input name="_id" value={formData._id} hidden/>
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
                <button type="submit">Actualizar</button>
            </form>
        </>
    );
};

export default Editar;
