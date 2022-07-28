import { useReducer, Fragment } from "react";

//Lo primero que vamos a agregar es una variable que contenga un objeto literal con el valor inicial del estado que vayamos a tener. Esta estará por fuera del componente.
let estadoInicial = { conteo: 0 };

//Otra cosa que vamos a necesitar es una función que tenga la lógica para saber de qué manera modificar el estado: si tenemos que incrementar, decrementar o resetear. A esta función podemos llamarla reducer y la usaremos como callback al usar useReducer. Esta función también irá por fuera del componente.

// Continuando con su anatomía, esta función reductora utilizará dos parámetros:
// - El estado actual, al cual podemos llamar estado.
// - Un objeto literal que tendrá información acerca de la acción que queremos hacer para el o los estados. A este parámetro lo llamaremos accion.

// Finalmente, esta función reductora retornará un nuevo valor (probablemente un objeto con muchas propiedades) y este será el que quede actualizado como estado. Veamos cómo queda conformada esta función:
let funcionReductora = (estado, accion) => {
  switch (accion.tipo) {
    case "incrementar":
      return { conteo: estado.conteo + 1 };
    case "decrementar":
      return { conteo: estado.conteo - 1 };
    case "resetear":
      return { conteo: 0 };
    default:
      throw new Error("No se ha recibido ningún tipo de acción...");
  }
};

function Contador(props) {
  //     Ahora lo que nos queda es utilizar useReducer dentro del componente y desestructurar (destructuring) dos de los elementos que nos provee: el estado y la información para “despachar” o entregar. Al mismo tiempo, habiendo creado una función reductora y un estado inicial, esto es lo que vamos a pasar como parámetros al Hook.
  const [estado, entregaDeInfo] = useReducer(funcionReductora, estadoInicial);

  // Ya la estructura está casi lista. Nos quedan algunos detalles para que puedas terminar de comprender el funcionamiento de este nuevo Hook.
  // Vamos a hacer que el botón “Decrementar” vaya restando al estado conteo. Para eso, vamos a agregar el evento onClick y dentro ejecutaremos una función para “entregar información” a la función reductora. Ahora, si estás pensando que esta situación de “entregar información” es algo que ya de alguna manera preparamos previamente… ¡estás en lo correcto! entregaDeInfo es la función que utilizaremos para hacerlo: entregar o despachar información a través de un objeto literal.
  // Este es un buen momento para ver cómo queda nuestro botón y así mantener la cordura que nos queda

  return (
    <>
      <h1>El conteo es {estado.conteo}</h1>
      <div>
        <button
          onClick={() => {
            entregaDeInfo({ tipo: "decrementar" });
          }}
        >
          Decrementar
        </button>
        <button
          onClick={() => {
            entregaDeInfo({ tipo: "incrementar" });
          }}
        >
          Incrementar
        </button>
        <button
          onClick={() => {
            entregaDeInfo({ tipo: "resetear" });
          }}
        >
          Resetear
        </button>
      </div>
    </>
  );
}

export default Contador;
