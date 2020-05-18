import React, { useState, useEffect, useContext } from "react";

import api from "./../../services/api";

import TerminaisContext from "./terminaisContext";

export default function Filtro() {
  const context = useContext(TerminaisContext);

  //console.log(context.terminais);
  const value = context.inicialTerminais;

  const [filtroVersao, setFiltroVersao] = useState("");
  const [codCliente, setCodCliente] = useState("");
  const [nfe, setNfe] = useState(-1);
  const [nfce, setNfce] = useState(-1);
  const [nfse, setNfse] = useState(-1);
  const [mdfe, setMdfe] = useState(-1);
  const [sped, setSped] = useState(-1);
  const [gestor, setGestor] = useState(-1);
  const [label, setLabel] = useState("Filtrar");

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
    // console.log(value);

    e.preventDefault();

    const result = value
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

    context.setTerminais(result);
    //console.log(context.terminais);
    //console.log(context.inicialTerminais);
    //console.log(result);
    setLabel("Filtrar");
  }
  function limpar() {
    setFiltroVersao("");
    setCodCliente("");
    setNfe(-1);
    setNfce(-1);
    setNfse(-1);
    setMdfe(-1);
    setSped(-1);
    setGestor(-1);
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={filtrar}>
          <div className="row">
            <div className="col-md-2">
              <label>Lista de Versões</label>
              <select
                value={filtroVersao}
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
                value={codCliente}
                id="pesquisa"
                onChange={(e) => setCodCliente(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-2">
                  <label>NF-e</label>
                  <select
                    value={nfe}
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
                    value={nfce}
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
                    value={mdfe}
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
                    value={nfse}
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
                    value={sped}
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
                    value={gestor}
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

            <div className="col-md-0">
              <br />
              <button
                onClick={() => setLabel("Aguarde..")}
                className="btn btn-primary"
                type="submit"
              >
                {label}
              </button>
            </div>
            <div className="col-md-0">
              <br />
              <button
                onClick={() => limpar()}
                className="btn btn-light"
                type="submit"
              >
                Limpar
              </button>
            </div>
            <div className="col-md-1">
              <label>
                Total <strong>{context.terminais.length}</strong>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
