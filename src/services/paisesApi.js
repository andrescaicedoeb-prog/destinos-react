const API_URL = "https://countries.dev";

export const buscarPais = async (nombre) => {
    const respuesta = await fetch(
        `${API_URL}/name/${nombre.toLowerCase()}`
    );

    if (!respuesta.ok) {
        throw new Error("Destino no encontrado");
    }

    const datos = await respuesta.json();
    return Array.isArray(datos) ? datos[0] : datos;
};