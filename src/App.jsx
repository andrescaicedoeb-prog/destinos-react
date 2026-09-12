import { useState } from "react";
import ExplorarDestinos from "./pages/ExplorarDestinos";
import MiListaDeViajes from "./pages/MiListaDeViajes";
import "./styles.css";

function App() {
  const [actualizar, setActualizar] = useState(0);

  return (
    <main>
      <h1>Explora Destinos</h1>

      <ExplorarDestinos
        onDestinoAgregado={() =>
          setActualizar((valor) => valor + 1)
        }
      />

      <hr />

      <MiListaDeViajes actualizar={actualizar} />
    </main>
  );
}

export default App;