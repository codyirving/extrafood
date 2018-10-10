import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Callback from "../components/Callback";
import App from "../App";
const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <Route path="/:filter?" component={App} />
        <Route path="/callback" component={Callback} />
      </div>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
