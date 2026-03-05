import { useEffect, useState } from "react";
import { getProximosArribos } from "../scripts/callbacks";
import { minutosFaltantes } from "../scripts/format";
import "../css/Card.css";
import "../css/Loader.css";

const CardTrain = ({ estacionId }) => {
    const [arribos, setArribos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!estacionId) return; // si es null o undefined, no hacer fetch

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getProximosArribos(estacionId);
                setArribos(data || []);
            } catch (error) {
                console.error("Error al obtener arribos:", error);
                setArribos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [estacionId]); // dependencias

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Cargando arribos...</p>
            </div>
        );
    }

    if (arribos.length === 0) {
        return <p>No hay arribos disponibles</p>;
    }

    // Filtrar arribos con minutos positivos
    const arribosFiltrados = arribos.filter(a => 
        minutosFaltantes(a.llegada) > 0
    );

    // Lista de terminales
    //consti, bosques, la plata
    let destino;

    if(estacionId == "93" || estacionId == "43" || estacionId == "217" ){
        destino = "Parte en";
    }
    else{
        destino = "Llegada";
    }

    return (
        <div className="card-container">
            {arribosFiltrados.map((arribo, index) => (
                <div key={index} className="card">
                <h2>Tren</h2>
                <p><strong>Destino:</strong> {arribo.cabeceraFinal}</p>
                <p><strong>Andén:</strong> {arribo.anden}</p>
                <p><strong>{destino}:</strong> {minutosFaltantes(arribo.llegada)} min.</p>
                </div>
            ))}
        </div>
    );
};

export default CardTrain;