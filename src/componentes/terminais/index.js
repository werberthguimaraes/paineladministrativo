import React from "react";
import {
  AiOutlineDownSquare,
  AiOutlineBorder,
  AiFillWindows,
  AiFillInfoCircle,
} from "react-icons/ai";

import "./style.css";

export default function Terminais() {
  const item = [];
  for (let index = 0; index < 100; index++) {
    item.push(index);
  }

  return (
    <div className="row">
      {item.map((a) => (
        <div key={a} className="espaco-card card shadow col-xl-3">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              123 - INORTE SISTEMAS
            </h6>
          </div>
          <div className="card-body margem-card">
            <p>
              <span className="badge badge-light">
                NF-e <AiOutlineDownSquare size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                NFC-e <AiOutlineBorder size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                NFS-e <AiOutlineDownSquare size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                MDF-e <AiOutlineBorder size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                Boleto <AiOutlineDownSquare size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                SPED <AiOutlineBorder size={25} color="#36b9cc" />
              </span>
              <span className="badge badge-light">
                Gestor <AiOutlineBorder size={25} color="#36b9cc" />
              </span>
            </p>
            <p>
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
                      <a href="#">10</a>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Versões
                      <AiFillInfoCircle size={24} />
                    </div>

                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      <a href="#">2020.147.20.38</a>
                    </div>
                  </div>
                </div>
              </div>
            </p>
            <p className="mb-0"></p>
          </div>
        </div>
      ))}
    </div>
  );
}
