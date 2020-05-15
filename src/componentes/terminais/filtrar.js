import React, { useState, useEffect } from "react";

import api from "./../../services/api";

export default function Filtro(value) {
  const [filtroVersao, setFiltroVersao] = useState("");
  const [codCliente, setCodCliente] = useState("");
  const [nfe, setNfe] = useState(-1);
  const [nfce, setNfce] = useState(-1);
  const [nfse, setNfse] = useState(-1);
  const [mdfe, setMdfe] = useState(-1);
  const [sped, setSped] = useState(-1);
  const [gestor, setGestor] = useState(-1);

  const [versoesFiltro, setVersoesFiltro] = useState([]);

  function getListaDeVersoesFiltro() {
    api.get("versaoterminal").then((res) => {
      setVersoesFiltro(res.data.VersaoTerminal);
    });
  }

  useEffect(() => {
    getListaDeVersoesFiltro();
  }, []);

  function filtrar(e) {
    console.log(value.value);

    e.preventDefault();

    const result = value.value
      .filter((obj) => {
        if (nfe != -1) return obj.usanfe == nfe;
        else return obj;
      })
      .filter((obj) => {
        if (nfce != -1) return obj.usanfce == nfce;
        else return obj;
      })
      .filter((obj) => {
        if (nfse != -1) return obj.usanfse == nfse;
        else return obj;
      })
      .filter((obj) => {
        if (mdfe != -1) return obj.usamdfe == mdfe;
        else return obj;
      })
      .filter((obj) => {
        if (sped != -1) return obj.usasped == sped;
        else return obj;
      })
      .filter((obj) => {
        if (gestor != -1) return obj.usagestor == gestor;
        else return obj;
      })
      .filter((obj) => {
        if (filtroVersao == "Todas" || filtroVersao == "") return obj;
        else if (filtroVersao == "sem") return obj.versao == undefined;
        else return obj.versao == filtroVersao;
      })
      .filter((obj) => {
        if (codCliente != "") return obj.id == codCliente;
        else return obj;
      });

    console.log(result);
    // setTerminais(result);
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={filtrar}>
          <div className="row">
            <div className="col-md-2">
              <label>Lista de Versões</label>
              <select
                onChange={(e) => setFiltroVersao(e.target.value)}
                className="form-control"
              >
                <option>Todas</option>
                <option value={"sem"}>Sem versão resgistrada</option>
                {versoesFiltro.map((v) => (
                  <option value={v.versao} key={v.versao}>
                    {v.versao}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-1">
              <label>Cód Cliente</label>
              <input
                id="pesquisa"
                onChange={(e) => setCodCliente(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-2">
                  <label>NF-e</label>
                  <select
                    onChange={(e) => setNfe(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>NFC-e</label>
                  <select
                    onChange={(e) => setNfce(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>MDF-e</label>
                  <select
                    onChange={(e) => setMdfe(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>NFS-e</label>
                  <select
                    onChange={(e) => setNfse(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>SPED</label>
                  <select
                    onChange={(e) => setSped(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>Gestor</label>
                  <select
                    onChange={(e) => setGestor(e.target.value)}
                    className="form-control"
                  >
                    <option value={-1}>Todas</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-1">
              <br />
              <button className="btn btn-primary" type="submit">
                Filtrar
              </button>
            </div>
            <div className="col-md-1">
              <label>
                Total <strong>{123}</strong>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
