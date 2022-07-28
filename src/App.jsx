import { useEffect, useState, useRef, useReducer } from "react";

import logo from "./logo.svg";
import menu from "./menu.svg";
import magnifier from "./magnifier.svg";
import "./App.css";
import Contador from "./Contador";

let initialState = {
  currentSearch: "",
  historial: [],
};

let reducer = (state, action) => {
  switch (action.type) {
    case "ACTUALIZAR_BUSQUEDA":
      return {
        //va a retornar el estado como lo haya recibido, como lo último que esté en el estado, pero quizas debemos actualizar algunas de sus propiedades
        ...state,
        currentSearch: action.payload,
      };
    case "ACTUALIZAR_HISTORIAL":
      return {
        ...state,
        historial: [...state.historial, state.currentSearch],
      };
    case "BORRAR_HISTORIAL":
      return {
        ...state,
        historial: [],
      };
    case "BORRAR_ITEM":
      return {
        ...state,
        currentSearch: { ...state.currentSearch },
        historial: action.payload,
      };
  }
};

// setHistorial((historial) =>
//     historial.filter((el, i) => i !== historial.length - 1)
//   );

function App() {
  let [state, dispatch] = useReducer(reducer, initialState);
  let inputSearch = useRef(null);

  useEffect(() => {
    inputSearch.current.focus();
  });

  // const handleChange = (e) => {
  //   setCurrentSearch(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (currentSearch === "") {
  //     alert("Ingresá una búsqueda");
  //   } else {
  //     setHistorial((old) => [...old, currentSearch]);
  //     setCurrentSearch("");
  //   }
  // };

  // const handleRemoveLast = (e) => {
  //   setHistorial((historial) =>
  //     historial.filter((el, i) => i !== historial.length - 1)
  //   );
  // };

  // const handleClearHistorial = (e) => {
  //   setHistorial([]);
  // };

  return (
    <>
      <header>
        <div className="icon-wrapper">
          <img src={menu} className="menu" alt="menu" />
          <img src={logo} className="logo" alt="logo" />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch({
              type: "ACTUALIZAR_HISTORIAL",
            });
            console.log(state);
          }}
        >
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Buscar"
            ref={inputSearch}
            autocomplete="off"
            // value={currentSearch}
            onChange={(e) => {
              dispatch({
                type: "ACTUALIZAR_BUSQUEDA",
                payload: e.target.value,
              });
              console.log(state);
            }}
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
          {state.historial.length === 0 ? (
            <h3>Lista vacia</h3>
          ) : (
            state.historial.map((el, i) => <li key={i}>{el}</li>)
          )}
        </ul>
        <div className="buttons">
          <button
            onClick={() => {
              dispatch({
                type: "BORRAR_ITEM",
                payload: state.historial.filter(
                  (el, i) => i !== state.historial.length - 1
                ),
              });
              console.log("borrar", state.currentSearch);
            }}
          >
            Borrar última
          </button>
          <button
            onClick={() => {
              dispatch({ type: "BORRAR_HISTORIAL" });
            }}
          >
            Limpiar lista
          </button>
        </div>
<hr/>
      <div className="">
        <h1>
          Paso a paso useReducer
        </h1>
        <Contador/>
      </div>
      </main>
    </>
  );
}

export default App;
