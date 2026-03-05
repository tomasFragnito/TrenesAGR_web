export const formatearHora = (fechaISO) => {
    const fecha = new Date(fechaISO);

    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
}

export const minutosFaltantes = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const ahora = new Date();

    //const fechaMinutos = String(fecha.getMinutes()).padStart(2, "0");
    //const fechaLocalMinutos = String(ahora.getMinutes()).padStart(2, "0");

    const diffMs = fecha - ahora; // diferencia real en milisegundos
    const diffMin = Math.floor(diffMs / 60000); // pasar a minutos

    return diffMin;
};