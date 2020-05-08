import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

import Loader from "./../Load";

import api from "../../services/api";
import "./style.css";

export default function Contingencias() {
  const [contingencias, setContingencias] = useState([]);
  const [detalhe, setDetalhe] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  function getCont() {
    api
      .get("contingencia")
      .then((d) => {
        if (d) {
          setContingencias(d.data.contingencia);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(true);
      });
  }

  useEffect(() => {
    getCont();
    const interval = setInterval(() => {
      getCont();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (id) => {
    getDetalhe(id);
    setModal(!modal);
  };

  function getDetalhe(id) {
    api.get(`detalhe?id=${id}`).then((res) => {
      setDetalhe(res.data.detalhe);
    });
  }

  //console.log(detalhe);
  return (
    <>
      {loading && <Loader />}
      <div className="row">
        {contingencias.map((c) => (
          <div key={c.id} className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="card-head">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    <h5>{c.fantasia}</h5>
                  </div>
                </div>

                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      {c.cnpj} <br />
                      {c.cidade} <br />
                      <h6 className="cor-telefone">{c.telefone}</h6>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <button
                        onClick={() => toggle(c.id)}
                        className="btn btn-danger btn-circle btn-lg"
                      >
                        {c.total}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Modal isOpen={modal} toggle={toggle} className="modal-xl">
          <ModalHeader toggle={toggle}>
            Lista de Erros de Contingências
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Núm Venda</th>
                  <th scope="col">Núm NF</th>
                  <th width="175px" scope="col">
                    Data
                  </th>
                  <th scope="col">Mensagem de Contingência</th>
                </tr>
              </thead>
              <tbody>
                {detalhe.map((a) => (
                  <tr key={a.id}>
                    <td>{a.venda_codigo}</td>
                    <td>{a.venda_nf}</td>
                    <td>{a.venda_fechamento}</td>
                    <td>{a.venda_log}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
