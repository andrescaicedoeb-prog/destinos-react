import { useEffect, useState } from "react";
import {
    obtenerViajes,
    actualizarViaje,
    eliminarViaje
} from "../services/viajesApi";

function MiListaDeViajes({ actualizar }) {
    const [viajes, setViajes] = useState([]);
    const [error, setError] = useState("");

    const cargarViajes = async () => {
        try {
            const datos = await obtenerViajes();
            setViajes(datos);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarViajes();
    }, [actualizar]);

    const marcarVisitado = async (viaje) => {
        await actualizarViaje(viaje.id, { visitado: !viaje.visitado });
        cargarViajes();
    };

    const cambiarPrioridad = async (viaje, prioridad) => {
        await actualizarViaje(viaje.id, { prioridad });
        cargarViajes();
    };

    const quitarDestino = async (id) => {
        await eliminarViaje(id);
        cargarViajes();
    };

    return (
        <section>
            <h2>Mi Lista de Viajes</h2>

            {error && <p>{error}</p>}

            {viajes.length === 0 ? (
                <p>Todavía no has agregado destinos.</p>
            ) : (
                viajes.map((viaje) => (
                    <article key={viaje.id}>
                        <h3>{viaje.pais}</h3>

                        <img
                            src={viaje.bandera}
                            alt={viaje.pais}
                            width="100"
                        />

                        <p>
                            Estado: {viaje.visitado
                                ? "Visitado"
                                : "Pendiente"}
                        </p>

                        <button onClick={() => marcarVisitado(viaje)}>
                            {viaje.visitado
                                ? "Marcar como pendiente"
                                : "Marcar como visitado"}
                        </button>

                        <select
                            value={viaje.prioridad}
                            onChange={(evento) =>
                                cambiarPrioridad(viaje, evento.target.value)
                            }
                        >
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>

                        <button onClick={() => quitarDestino(viaje.id)}>
                            Quitar de mi lista
                        </button>
                    </article>
                ))
            )}
        </section>
    );
}

export default MiListaDeViajes;