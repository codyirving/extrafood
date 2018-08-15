import { createStore, compose } from "redux";

import reducer from "./reducer";
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default createStore(reducer, enhancers);
