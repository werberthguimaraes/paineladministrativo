import React, { Fragment } from "react";

import "./style.css";

export default function Loader() {
  return (
    <Fragment>
      <div className={`loader-wrapper`}>
        <div className="loader bg-white">
          <div className="whirly-loader"> </div>
        </div>
      </div>
    </Fragment>
  );
}
