import React, { Component } from "react";
import NavBar from "./components/navbar";
import ClaimFood from "./components/claimfood";
import ListFood from "./components/listfood";
import Welcome from "./components/welcome.jsx";
import { isLoggedIn } from "./utils/AuthService";
import "./AppNew.css";
import { connect } from "react-redux";

import { refData } from "./actions/index";

export class App extends Component {
  componentDidMount() {
    console.log("App component did mount");

    this.props.dispatch(refData());
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />

        {!isLoggedIn() && <Welcome />}

        {isLoggedIn() && <main className="container" />}
        {isLoggedIn() && this.props.togglePage && <ClaimFood />}
        {isLoggedIn() && !this.props.togglePage && <ListFood />}
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
