import { useState } from "react";
import { buscarPais } from "../services/paisesApi";
import { agregarViaje } from "../services/viajesApi";

function ExplorarDestinos({ onDestinoAgregado }) {
    const [busqueda, setBusqueda] = useState("");
    const [destino, setDestino] = useState(null);
    const [error, setError] = useState("");

    const buscar = async () => {
        try {
            setError("");
            const datos = await buscarPais(busqueda);
            setDestino(datos);
        } catch (error) {
            setDestino(null);
            setError(error.message);
        }
    };

    const agregarADestinos = async () => {
        if (!destino) return;

        const nuevoViaje = {
            pais: destino.name,
            bandera: destino.flags.png,
            prioridad: "media",
            visitado: false
        };

        try {
            await agregarViaje(nuevoViaje);
            onDestinoAgregado();
            alert(`${destino.name} fue agregado a tu lista`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="explorar">
            <h2>Explorar destinos</h2>

            <div className="buscador">
                <input
                    type="text"
                    value={busqueda}
                    placeholder="Ejemplo: japon"
                    onChange={(evento) => setBusqueda(evento.target.value)}
                />
                <button className="btn-buscar" onClick={buscar}>Buscar</button>
            </div>

            {error && <p className="error">{error}</p>}

            {destino && (
                <article className="tarjeta-destino">
                    <img
                        src={destino.flags.png}
                        alt={destino.name}
                        className="bandera"
                    />

                    <div className="info-destino">
                        <h3>{destino.name}</h3>
                        <p><span>Capital:</span> {destino.capital}</p>
                        <p><span>Región:</span> {destino.region}</p>
                        <p><span>Población:</span> {destino.population.toLocaleString()}</p>

                        <button className="btn-agregar" onClick={agregarADestinos}>
                            + Agregar a mi lista
                        </button>
                    </div>
                </article>
            )}
        </section>
    );
}

export default ExplorarDestinos;