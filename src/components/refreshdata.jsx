import React, { Component } from "react";
import { connect } from "react-redux";
import { refData } from "../actions/index";
export class RefreshData extends Component {
  onClick = event => {
    event.preventDefault();
    console.log("Handling refresh of data dispatch");
    this.props.dispatch(refData());
  };
  render() {
    return (
      <div className="row">
        <button onClick={e => this.onClick(e)}>REFRESH LISTINGS</button>
      </div>
    );
  }
}

export default connect()(RefreshData);
