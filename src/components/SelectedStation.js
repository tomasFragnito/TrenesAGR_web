import { useEffect, useState } from "react";
import { getEstacion } from "../scripts/callbacks";
import "../css/SelectedStation.css";
import "../css/Responsive.css";

const SelectedStation = ({ onStationSelect }) => {
    const [estacion, setStation] = useState(() => {
        return localStorage.getItem("estacion") || "Constitucion";
    });

    const fetchEstacion = async (nombre) => {
        try {
        const data = await getEstacion(nombre);
        onStationSelect(data[0]?.idEstacion || null); // envia id al padre
        } catch (error) {
        console.error("Error obteniendo estación:", error);
        onStationSelect(null);
        }
    };

    // Se ejecuta solo al montar, para seleccionar Temperley
    useEffect(() => {
        fetchEstacion(estacion);
    }, []);

    const handleChange = (e) => {
        const nombre = e.target.value;
        setStation(nombre);
        localStorage.setItem("estacion", nombre);
        fetchEstacion(nombre);
    };

    return (
        <div className="station-container">
            <label>Seleccionar estación</label>

            <select value={estacion} onChange={handleChange}>

                <option value="Constitucion">Constitución</option>
                <option value="Hipolito Yrigoyen">Hipólito Yrigoyen</option>
                <option value="Santillán y Kosteki">Darío Santillán y Maximiliano Kosteki</option>
                <option value="Gerli">Gerli</option>
                <option value="Lanus">Lanús</option>
                <option value="Remedios de Escalada">Remedios de Escalada</option>
                <option value="Banfield">Banfield</option>
                <option value="Lomas de Zamora">Lomas de Zamora</option>
                <option value="Temperley">Temperley</option>
                <option value="Turdera">Turdera</option>
                <option value="Llavallol">Llavallol</option>
                <option value="Luis Guillon">Luis Guillón</option>
                <option value="Monte Grande">Monte Grande</option>
                <option value="El Jaguel">El Jagüel</option>
                <option value="Ezeiza">Ezeiza</option>
                <option value="Union Ferroviaria">Unión Ferroviaria</option>
                <option value="Tristan Suarez">Tristán Suárez</option>
                <option value="Spegazzini">Spegazzini</option>
                <option value="Maximo Paz">Máximo Paz</option>
                <option value="Vicente Casares">Vicente Casares</option>
                <option value="Alejandro Petion">Alejandro Petión</option>
                <option value="Kloosterman">Kloosterman</option>
                <option value="Levene">Levene</option>
                <option value="Cañuelas">Cañuelas</option>

                <option value="Sarandi">Sarandí</option>
                <option value="Villa Dominico">Villa Domínico</option>
                <option value="Wilde">Wilde</option>
                <option value="Don Bosco">Don Bosco</option>
                <option value="Bernal">Bernal</option>
                <option value="Quilmes">Quilmes</option>
                <option value="Ezpeleta">Ezpeleta</option>
                <option value="Berazategui">Berazategui</option>
                <option value="Platanos">Plátanos</option>
                <option value="Hudson">Hudson</option>
                <option value="Pereyra">Pereyra</option>
                <option value="Villa Elisa">Villa Elisa</option>
                <option value="City Bell">City Bell</option>
                <option value="Gonnet">Gonnet</option>
                <option value="Ringuelet">Ringuelet</option>
                <option value="Tolosa">Tolosa</option>
                <option value="La Plata">La Plata</option>

                <option value="Jose Marmol">José Mármol</option>
                <option value="Rafael Calzada">Rafael Calzada</option>
                <option value="Claypole">Claypole</option>
                <option value="Ardigo">Ardigó</option>
                <option value="Florencio Varela">Florencio Varela</option>
                <option value="Sourigues">Sourigues</option>
                <option value="Bosques">Bosques</option>
            </select>
        </div>
    );
};

export default SelectedStation;