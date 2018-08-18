import React, { Component } from "react";
import { connect } from "react-redux";
import NewListing from "../components/newlisting.jsx";
export class ListFood extends Component {
  render() {
    return (
      <React.Fragment>
        <NewListing />
      </React.Fragment>
    );
  }
}
export default connect()(ListFood);
