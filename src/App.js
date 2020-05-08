import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MenuLateral from "./componentes/lateral";
import Dashboard from "./componentes/dashboard";
import Contingencias from "./componentes/contingencias";
import Terminais from "./componentes/terminais";
import Certificados from "./componentes/certificados";

function App() {
  return (
    <div id="wrapper">
      <BrowserRouter>
        <MenuLateral />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <br />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/contingencias" component={Contingencias} />
                <Route path="/certificados" component={Certificados} />
                <Route path="/terminais" component={Terminais} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
