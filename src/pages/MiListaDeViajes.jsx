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
        <section className="mi-lista">
            <h2>Mi Lista de Viajes</h2>

            {error && <p className="error">{error}</p>}

            {viajes.length === 0 ? (
                <p className="vacio">Todavía no has agregado destinos.</p>
            ) : (
                <div className="grid-viajes">
                    {viajes.map((viaje) => (
                        <article key={viaje.id} className="tarjeta-viaje">
                            <img
                                src={viaje.bandera}
                                alt={viaje.pais}
                                className="bandera-chica"
                            />

                            <div className="contenido-viaje">
                                <h3>{viaje.pais}</h3>

                                <span
                                    className={`estado ${viaje.visitado ? "visitado" : "pendiente"}`}
                                >
                                    {viaje.visitado ? "Visitado" : "Pendiente"}
                                </span>

                                <span className={`prioridad prioridad-${viaje.prioridad}`}>
                                    Prioridad: {viaje.prioridad}
                                </span>

                                <div className="acciones">
                                    <button
                                        className="btn-toggle"
                                        onClick={() => marcarVisitado(viaje)}
                                    >
                                        {viaje.visitado ? "Marcar pendiente" : "Marcar visitado"}
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

                                    <button
                                        className="btn-quitar"
                                        onClick={() => quitarDestino(viaje.id)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default MiListaDeViajes;