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
        <section>
            <h2>Explorar destinos</h2>

            <input
                type="text"
                value={busqueda}
                placeholder="Ejemplo: japon"
                onChange={(evento) =>
                    setBusqueda(evento.target.value)
                }
            />

            <button onClick={buscar}>Buscar</button>

            {error && <p>{error}</p>}

            {destino && (
                <article>
                    <h2>{destino.name}</h2>

                    <img
                        src={destino.flags.png}
                        alt={destino.name}
                        width="150"
                    />

                    <p>Capital: {destino.capital}</p>
                    <p>Región: {destino.region}</p>
                    <p>Población: {destino.population}</p>

                    <button onClick={agregarADestinos}>
                        Agregar a mi lista de viajes
                    </button>
                </article>
            )}
        </section>
    );
}

export default ExplorarDestinos;

//integracion de explorarDestinos.jsx
