import React, { useState, Fragment, useContext } from "react";
import { AiFillWindows, AiFillInfoCircle } from "react-icons/ai";
import {
  FaRegSquare,
  FaRegCheckSquare,
  FaServer,
  FaLaptop,
} from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import api from "../../services/api";

import TerminaisContext from "./terminaisContext";

import "./style.css";

export default function Lista() {
  const context = useContext(TerminaisContext);

  const lista = context.terminais;

  //setTerminais(value);

  //console.log(lista);

  const [listaTerminais, setListaTerminais] = useState([]);
  const [listaVersoes, setListaVersoes] = useState([]);

  const [modal, setModal] = useState(false);

  async function getDetalheTerminal(id) {
    await api.get(`terminal?id_cliente=${id}`).then((a) => {
      if (a) {
        const r = a.data.Terminal;

        setListaTerminais(r);

        getVersao(r[0].id_cliente, r[0].id_terminal);
      }
    });
  }

  async function getVersao(id_cliente, id_terminal) {
    setListaVersoes([]);
    await api
      .get(`terminalversao?id_cliente=${id_cliente}&id_terminal=${id_terminal}`)
      .then((b) => {
        if (b) {
          setListaVersoes(b.data.TerminalVersao);
        }
      });
  }
  const toggle = (id, qtde) => {
    if (!modal) {
      if (qtde > 0) getDetalheTerminal(id);
    } else {
      setListaVersoes([]);
      setListaTerminais([]);
    }
    if (qtde > 0) setModal(!modal);
    else setModal(false);
  };

  return (
    <Fragment>
      <div className="row">
        {lista.map((a) => (
          <div key={a.id} className="col-md-3">
            <div className="espaco-card card shadow ">
              <div
                style={{ height: "50px" }}
                className="card-header py-3 bg-gradient-success"
              >
                <h6 className="text-light">
                  {a.id} - {a.nome.substring(0, 30)}
                </h6>
              </div>
              <div className="card-body margem-card">
                <div className="row">
                  <span className=" badge badge-light">
                    <label className="largura">NF-e</label>
                    {a.usanfe ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>

                  <span className=" badge badge-light">
                    <label className="largura">NFC-e</label>
                    {a.usanfce ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>

                  <span className=" badge badge-light">
                    <label className="largura">NFS-e</label>
                    {a.usanfse ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>
                  <span className=" badge badge-light">
                    <label className="largura">MDF-e</label>
                    {a.usamdfe ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>
                  <span className=" badge badge-light">
                    <label className="largura">SPED</label>
                    {a.usasped ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>
                  <span className=" badge badge-light">
                    <label className="largura">Gestor</label>
                    {a.usagestor ? (
                      <FaRegCheckSquare size={25} color="#36b9cc" />
                    ) : (
                      <FaRegSquare size={25} color="#36b9cc" />
                    )}
                  </span>
                </div>
                <div className="row">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      <hr />
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto espaco-entre">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Terminais <AiFillWindows size={24} />
                        </div>

                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          <button
                            className="btn btn-link"
                            onClick={() => toggle(a.id, a.total_terminal)}
                          >
                            <h5>{a.total_terminal}</h5>
                          </button>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Versões
                          <AiFillInfoCircle size={24} />
                        </div>

                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          <span>{a.versao ? a.versao : "..."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mb-0"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-xl">
        <ModalHeader toggle={toggle}>Terminais</ModalHeader>
        <ModalBody>
          <div className="accordion" id="accordionExample">
            {listaTerminais.map((item) => (
              <div key={item.id} className="card">
                <div className="card-header" id={`heading${item.id}`}>
                  <div className="row">
                    <div className="col-xl-5">
                      <h2 className="mb-0">
                        <button
                          onClick={() =>
                            getVersao(item.id_cliente, item.id_terminal)
                          }
                          className={`btn btn-link ${
                            item.servidor === 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-toggle="collapse"
                          data-target={`#collapse${item.id}`}
                          aria-expanded={`${item.servidor ? true : false} `}
                          aria-controls={`collapse${item.id}`}
                        >
                          {item.servidor === 1 ? (
                            <FaServer size={36} />
                          ) : (
                            <FaLaptop size={36} />
                          )}
                          <label
                            style={{ marginLeft: "15px" }}
                            className="font-weight-bold text-gray-800"
                          >
                            {item.nome} - IP[{item.ip}]
                          </label>
                        </button>
                      </h2>
                    </div>
                    <div className="col-xl-6">
                      Processador: <strong>{item.processador}</strong>
                      <br />
                      Família: <strong>{item.familia}</strong>
                      <br />
                      Threads: <strong>{item.threads}</strong>
                      <br />
                      FileSystem: <strong>{item.filesystem}</strong>
                      <br />
                      Memória: <strong>{item.memoria}</strong>
                      <br />
                      Sistema: <strong>{item.os}</strong>
                      <br />
                      Dominio: <strong>{item.dominio}</strong>
                      <br />
                      Usuário: <strong>{item.usuario}</strong>
                      <br />
                      Mac address: <strong>{item.mac}</strong>
                      <br />
                      acesso:
                      <strong>{item.acesso}</strong>
                      <br />
                      Atualizado em: <strong>{item.dataupdate}</strong>
                      <br />
                    </div>
                  </div>
                </div>

                <div
                  id={`collapse${item.id}`}
                  className={`collapse ${item.servidor && "show"} `}
                  aria-labelledby={`heading${item.id}`}
                  data-parent="#accordionExample"
                >
                  <div
                    style={{ paddingTop: "10px", paddingLeft: "10px" }}
                    className="row bg-gray-500"
                  >
                    {listaVersoes.map((v) => (
                      <div
                        key={v.id}
                        className="card border-bottom-primary shadow h-100 py-2ard mb-4"
                        style={{ marginLeft: "10px" }}
                      >
                        <div className="card-header">{v.nome}</div>
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-4">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                {v.datahora}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                <span className="badge badge-info">
                                  {v.versao}
                                </span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
