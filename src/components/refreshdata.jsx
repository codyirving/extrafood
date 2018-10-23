import React, { Component } from "react";
import { connect } from "react-redux";
import { refData } from "../actions/index";
export class RefreshData extends Component {
  onClick = event => {
    event.preventDefault();
    //console.log("Handling refresh of data dispatch");
    this.props.dispatch(refData());
  };
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <button
            className="btn btn-deep-orange refresh-button"
            onClick={e => this.onClick(e)}
          >
            REFRESH LISTINGS
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(RefreshData);
