import React, { useEffect, useState, Fragment } from "react";

import Filtro from "./filtrar";
import Lista from "./terminais";

import api from "../../services/api";

import Loader from "./../Load";

import TerminaisContext from "./terminaisContext";

import "./style.css";

export default function Terminais() {
  const [terminais, setTerminais] = useState([]);
  const [inicialTerminais, setInicialTerminais] = useState([]);

  const [loading, setLoading] = useState(true);

  function getTerminais() {
    api
      .get("terminalresumido")
      .then((res) => {
        if (res) {
          console.log(res.data.ModelTerminalResumido);
          setInicialTerminais(res.data.ModelTerminalResumido);
          setTerminais(res.data.ModelTerminalResumido);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(true);
      });
  }

  useEffect(() => {
    getTerminais();
    console.log(inicialTerminais);
  }, []);

  return (
    <Fragment>
      {loading && <Loader />}
      <TerminaisContext.Provider value={{ terminais: this.inicialTerminais }}>
        <Filtro value={inicialTerminais} />
      </TerminaisContext.Provider>
    </Fragment>
  );
}
