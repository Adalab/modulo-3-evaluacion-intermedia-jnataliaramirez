import "../styles/App.scss";
import "../services/localStorage";
import dataOriginal from "../components/data.json";
import { useState } from "react";

function App() {
  // * Variables
  const [data, setData] = useState(dataOriginal);
  const [nameClub, SetNameClub] = useState(''); 
  const [week, setWeek] = useState(false);
  const [weekend, setWeekend] = useState(false);


  // * Funciones manejadoras
  const handleFormInput = (ev) => {
    console.log(ev.target.value)

  }

  const handleFormWeek = (ev) => {
    console.log(ev.target.checked)
    setWeek(ev.target.checked);
  }
  const handleFormWeekend = (ev) => {
    console.log(ev.target.checked)
    setWeekend(ev.target.checked);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const newClub = {
      "name": 
    }

    console.log('click')
  }

  // * Funcion render
  const renderData = () => {
    return data.map((aData, index) => {
      return (
        <article key={index}>
          <h3>
            #{index}: {aData.name}
          </h3>
          <p>
            Abierto entre semana: {aData.openOnWeekdays === true ? "Sí" : "No"}
          </p>
          <p>
            Abierto el fin desemana:{" "}
            {aData.openOnWeekend === true ? "Sí" : "No"}
          </p>
        </article>
      );
    });
  };

  return (
    <>
      <header>
        <h1>Mis clubs</h1>
        <p>Mostrar</p>
        <select name="filter" id="filter">
          <option value="all">Todos</option>
          <option value="week">los que abren entre semana</option>
          <option value="weekend">los que abren el fin de semana </option>
        </select>
      </header>
      <main>
        <section>
          {/* JS */}
          {renderData()}
          {/* JS */}
        </section>
        <section>
          <h2>Añadir un nuevo club</h2>
          <form>
            <div>
              <label htmlFor="name"> Nombre del club
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  // value=""
                  onChange={handleFormInput}
                  />
              </label>
            </div>
            <div>
              <label htmlFor="openWeek">
                <input
                  id="openWeek"
                  type="checkbox"
                  name="openWeek"
                  // value=""
                  onChange={handleFormWeek}
                />
                ¿Abre entre semana?
              </label>
            </div>
            <div>
              <label htmlFor="openWeekEnd">
                <input
                  id="openWeekEnd"
                  type="checkbox"
                  name="openWeekEnd"
                  // value=""
                  onChange={handleFormWeekend}
                />
                ¿Abre los fines de semana?
              </label>
            </div>
            <button type="submit" onClick={handleSubmit}>Añadir un nuevo club</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
