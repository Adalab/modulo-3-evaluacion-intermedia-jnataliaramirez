import "../styles/App.scss";
import "../services/localStorage";
import dataOriginal from "../components/data.json";
import { useState } from "react";

function App() {
  // * Variables
  const [data, setData] = useState(dataOriginal);
  const [nameClub, setNameClub] = useState(''); 
  const [week, setWeek] = useState(false);
  const [weekend, setWeekend] = useState(false);
  const [filterData, setFilterData] = useState('Todos');


  // * Funciones manejadoras
  const handleFormInput = (ev) => {
    setNameClub(ev.target.value)
  }

  const handleFormWeek = (ev) => {
    setWeek(ev.target.checked);
  }
  const handleFormWeekend = (ev) => {
    setWeekend(ev.target.checked);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const newClub = {
      "name": nameClub,
      "openOnWeekdays": week,
      "openOnWeekend": weekend
    };

    setData( [...data, newClub]);

    setNameClub('');
  }

  const handleFilter = (ev) => {
    setFilterData(ev.target.value);
  }



  // * Funcion render
  const renderData = () => {
    return data
    .filter((aData) => {
      if (filterData  === 'openOnWeekdays') {
        return aData.openOnWeekdays === true
      } else if (filterData === 'openOnWeekend') {
        return aData.openOnWeekend === true
      } return true
    })
    .map((aData, index) => {
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
        <select name="filter" id="filter" onChange={handleFilter}>
          <option value="all">Todos</option>
          <option value="openOnWeekdays">Los que abren entre semana</option>
          <option value="openOnWeekend">Los que abren el fin de semana </option>
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
                  value={nameClub}
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
                  value={week}
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
                  value={weekend}
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
