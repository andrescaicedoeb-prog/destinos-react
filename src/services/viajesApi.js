const API = "http://localhost:3001/listaDeViajes";

export const obtenerViajes = async () => {
    const respuesta = await fetch(API);

    if (!respuesta.ok) {
        throw new Error("No fue posible cargar la lista");
    }

    return await respuesta.json();
};

export const agregarViaje = async (viaje) => {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(viaje)
    });

    if (!respuesta.ok) {
        throw new Error("No fue posible agregar el destino");
    }

    return await respuesta.json();
};

export const actualizarViaje = async (id, cambios) => {
    const respuesta = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cambios)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar");
    }

    return await respuesta.json();
};

export const eliminarViaje = async (id) => {
    const respuesta = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el destino");
    }
};

// integracion de viajesApi.js