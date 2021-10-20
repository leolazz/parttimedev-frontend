import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/vapor/bootstrap.min.css";
import "./styles/basic-grid.css";
import Jobs from "./components/Jobs";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Jobs />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
