import { useState } from "react";

import logo from "./logo.svg";
import menu from "./menu.svg";
import magnifier from "./magnifier.svg";
import "./App.css";

function App() {
  let [historial, setHistorial] = useState([]);
  let [currentSearch, setCurrentSearch] = useState("");

  const handleChange = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSearch === "") {
      alert("Ingresá una búsqueda");
    } else {
      setHistorial((old) => [...old, currentSearch]);
      setCurrentSearch("");
    }
  };

  const handleRemoveLast = (e) => {
    setHistorial((historial) =>
      historial.filter((el, i) => i !== historial.length - 1)
    );
  };

  const handleClearHistorial = (e) => {
    setHistorial([]);
  };

  return (
    <>
      <header>
        <div className="icon-wrapper">
          <img src={menu} className="menu" alt="menu" />
          <img src={logo} className="logo" alt="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Buscar"
            autocomplete="off"
            onChange={handleChange}
            value={currentSearch}
          />
          <button type="submit">
            <img src={magnifier} alt="search" />
          </button>
        </form>
        <div className="avatar"></div>
      </header>
      <main>
        <h1>Historial de búsquedas</h1>
        <ul>
          {historial.length === 0 ? (
            <h3>Lista vacia</h3>
          ) : (
            historial.map((el, i) => <li key={i}>{el}</li>)
          )}
        </ul>
        <div className="buttons">
          <button onClick={handleRemoveLast}>Borrar última</button>
          <button onClick={handleClearHistorial}>Limpiar lista</button>
        </div>
      </main>
    </>
  );
}

export default App;
