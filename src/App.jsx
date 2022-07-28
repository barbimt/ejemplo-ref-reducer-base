import { useEffect, useState, useRef } from "react";

import logo from "./logo.svg";
import menu from "./menu.svg";
import magnifier from "./magnifier.svg";
import "./App.css";

function App() {

  //estoy usando dos estados
  let [historial, setHistorial] = useState([]);
  //este se va a encargar de mantener tanto en el input de busqueda (actualizado, el estado actual de la busqueda q tengo en el campo), como también al hacer click el valor va a pasar a formar parte de historial en su posición 1 o en la ultima posible para ir guardando de a poco todas esas búsquedas
  let [currentSearch, setCurrentSearch] = useState("");

  //guardo el valor de retorno de useRef en inputSearch
  //esta referencia se va a convertir en una porción de HTML, en este caso en una etiqueta (le agrego ref={inputSearch} en  el return a la etiqueta input que es la q quiero referenciar). De esta manera estoy estableciendo esta sincronización para posteriormente en un momento en particular de la opp, gracias a los ciclos de vida, en el momento cuando se terminen de montar todos los componentes o el componente en este caso, lo que quiero hacer es hacer foco en el elemento que tengo como referencia. 
  //cada vez q manipulemos una referencia,en este caso inputSearch es un objeto literal pero current es el que tiene la referencia en sí. 
  //inputSearch -> es un objeto 
  //current-> tiene a la referencia dentro. 
  //useRef, la idea es que cada vez q yo ingreso a la app se hace foco de manera automática en el cmapo de search
  let inputSearch = useRef(null)
  //agrego useEffect
  useEffect(()=> {
    inputSearch.current.focus()
  })

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
            ref={inputSearch}
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
