import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import ClaimFood from "./components/claimfood";
import ListFood from "./components/listfood";
import Callback from "./components/Callback";
import "./App.css";
import { connect } from "react-redux";

import { refData } from "./actions/index";
import "react-day-picker/lib/style.css";

export class App extends Component {
  componentDidMount() {
    console.log("App component did mount");

    this.props.dispatch(refData());
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Router>
          <Route path="/callback" component={Callback} />
        </Router>
        <main className="container" />
        {this.props.togglePage && <ClaimFood />}
        {!this.props.togglePage && <ListFood />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  togglePage: state.togglePage,
  listings: state.listings,
  filteredListings: state.filteredListings
});
export default connect(mapStateToProps)(App);
