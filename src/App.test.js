import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Root from "./components/Root";
import store from "./store";
it("renders without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Root store={store} />, root);
  ReactDOM.unmountComponentAtNode(root);
});
