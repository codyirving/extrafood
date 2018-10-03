import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListings from "../components/searchlistings.jsx";
import RefreshData from "../components/refreshdata.jsx";
import Listings from "../components/listings";

export class ClaimFood extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row search-refresh">
          <SearchListings />
          <RefreshData />
        </div>
        <Listings />
      </React.Fragment>
    );
  }
}

export default connect()(ClaimFood);
