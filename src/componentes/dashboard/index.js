import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import api from "../../services/api";
import Loader from "../Load";

export default function Dashboard() {
  const [dadosServicos, setDadosSevicos] = useState([]);
  const [dadosMonitor, setDadosMonitor] = useState([]);
  const [dadosMonitorInstall, setDadosMonitorInstall] = useState([]);
  const [totalCertificado, setTotalCertificado] = useState(0);
  const [totalMonitor, setMonitor] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonitor();
    carregadadosCertificado();
    getMonitorInstall();
    setLoading(false);

    const interval = setInterval(() => {
      getMonitor();
      carregadadosCertificado();
      getMonitorInstall();
      setLoading(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function getMonitor() {
    api.get("monitorservice").then((res) => {
      const data = res.data.ModelMonitorService[0];
      setMonitor(data.total_instalado);
      setDadosMonitor({
        labels: [`Ativo ${data.total_ativo}`, `Parado ${data.total_parado}`],
        datasets: [
          {
            label: "iServidorTarefa",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [data.total_ativo, data.total_parado],
          },
        ],
      });
    });
  }

  function getMonitorInstall() {
    api.get("monitorinstall").then((res) => {
      const data = res.data.ModelMonitorInstall[0];
      setTotalClientes(data.total_clientes);
      setDadosMonitorInstall({
        labels: [
          `Instalado ${data.total_instalado}`,
          `Não instalado ${data.total_desinstalado}`,
        ],
        datasets: [
          {
            label: "iServidorTarefa",
            backgroundColor: "#7FFFD4",
            borderColor: "#008080",
            borderWidth: 2,
            hoverBackgroundColor: "#1E90FF",
            hoverBorderColor: "#008080",
            data: [data.total_instalado, data.total_desinstalado],
          },
        ],
      });
    });
  }

  function carregadadosCertificado() {
    api.get("monitorcertified").then((res) => {
      const obj = res.data.ModelMonitorCertified[0];
      setTotalCertificado(obj.total_certificado);
      setDadosSevicos({
        labels: [
          `Normal ${obj.total_normal}`,
          `Configurado ${obj.total_config}`,
          `Desabilitado ${obj.total_desabilitado}`,
          `Vencidos ${obj.total_vencidas}`,
        ],
        datasets: [
          {
            data: [
              obj.total_normal,
              obj.total_config,
              obj.total_desabilitado,
              obj.total_vencidas,
            ],
            backgroundColor: [
              "#27DE55",
              "#6A6AFF",
              "#FFCE56",
              "#dadada",
              "#FF2626",
            ],
            hoverBackgroundColor: [
              "#27DE55",
              "#6A6AFF",
              "#FFCE56",
              "#dadada",
              "#FF2626",
            ],
          },
        ],
      });
    });
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row">
        <div className="col-md-5">
          <div className="card shadow h-100 ">
            <div className="card-header text-center text-light bg-gradient-primary">
              Certificados: {totalCertificado}
            </div>
            <div className="card-body">
              <Doughnut data={dadosServicos} />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card shadow h-100 ">
            <div className="card-header text-center text-light bg-gradient-primary">
              Serviço {totalMonitor}
            </div>
            <div className="card-body">
              <Bar data={dadosMonitor} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-5">
          <div className="card shadow h-100 ">
            <div className="card-header text-center text-light bg-gradient-primary">
              Clientes {totalClientes}
            </div>
            <div className="card-body">
              <Bar data={dadosMonitorInstall} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
