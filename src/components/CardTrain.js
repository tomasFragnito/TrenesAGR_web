import { useEffect, useState } from "react";
import { getProximosArribos } from "../scripts/callbacks";
import { minutosFaltantes } from "../scripts/format";
import "../css/Card.css";
import "../css/Loader.css";
import "../css/Responsive.css";

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
    let classNameConsti;

    if(estacionId === "93" || estacionId === "43" || estacionId === "217" ){
        destino = "Parte en";
        classNameConsti = "card-container consti";
    }
    else{
        destino = "Llegada";
        classNameConsti = "card-container left";
    }

    const constitucion = arribosFiltrados.filter(a => 
        a.cabeceraFinal.includes("Plaza C.")
    );

    const otros = arribosFiltrados.filter(a => 
        !a.cabeceraFinal.includes("Plaza C.")
    ); 

    return (
        <div className="container-global">
            {/* Otros destinos */}
            <div className={classNameConsti}>
                {otros.map((arribo, index) => (
                    <div key={index} className="card">
                        <div className="divAnden">
                            <strong>Andén</strong> <h2>{arribo.anden}</h2>
                        </div>

                        <div className="divDestino">
                            <p>{arribo.cabeceraFinal}</p>
                        </div>

                        <div className="divTime">
                            <p><strong>{destino}:</strong> {minutosFaltantes(arribo.llegada)} min.</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Constitución */}
            <div className="card-container right">
                {constitucion.map((arribo, index) => (
                    <div key={index} className="card">
                        <div className="divAnden">
                            <strong>Andén</strong> <h2>{arribo.anden}</h2>
                        </div>

                        <div className="divDestino">
                            <p>{arribo.cabeceraFinal}</p>
                        </div>

                        <div className="divTime">
                            <p><strong>{destino}:</strong> {minutosFaltantes(arribo.llegada)} min.</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CardTrain;