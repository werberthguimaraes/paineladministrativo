import React, { useEffect, useState } from "react";

import api from "./../../services/api";

export default function Certificados() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    api.get("monitorcertifiedlist").then((res) => {
      setLista(res.data.ModelMonitorCertifiedList);
    });
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cliente</th>
          <th scope="col">Fantasia</th>
          <th scope="col">celular</th>
          <th scope="col">Início</th>
          <th scope="col">Data Certificado</th>
        </tr>
      </thead>
      <tbody>
        {lista.map((li) => (
          <tr key={li}>
            <th scope="row">{li.id_cliente}</th>
            <td>{li.nome}</td>
            <td>{li.fantasia}</td>
            <td>{li.celular}</td>
            <td>{li.inicio}</td>
            <td>{li.certificado_data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
