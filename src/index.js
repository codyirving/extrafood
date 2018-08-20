import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import Root from "./components/Root";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

registerServiceWorker();
