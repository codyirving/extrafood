import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Root from "./components/Root";
import Welcome from "./components/welcome";
import store from "./store";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "isomorphic-fetch";
configure({ adapter: new Adapter() });

describe("<Root />", () => {
  it("renders without crashing", () => {
    console.log("start test");
    // const wrapper = shallow(<App />, {
    //   context: {},
    //   disableLifecycleMethods: true
    // });
    // console.log(wrapper.debug());
    const root = document.createElement("div");
    ReactDOM.render(<Root store={store} />, root);
    ReactDOM.unmountComponentAtNode(root);
  });
});
