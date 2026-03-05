
const BASE_URL = "http://localhost:8080/api";

export const getProximosArribos = async (id) => {
    try {
        const res = await fetch(BASE_URL + "/arribos/estacion/" + id);

        if (!res.ok) {
            throw new Error("Error al obtener arribos");
        }
        
        return await res.json();

    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getEstacion = async (name) => {
    try {
        const res = await fetch(BASE_URL + "/infraestructura/estaciones?nombre=" + encodeURIComponent(name));

        if (!res.ok) {
            throw new Error("Error al obtener estacion");
        }

        return await res.json();

    } catch (error) {
        console.error(error);
        return [];
    }
}