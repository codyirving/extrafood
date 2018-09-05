import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMainPage } from "../actions/index";

import { login, logout, isLoggedIn } from "../utils/AuthService";
export class NavBar extends Component {
  onClick(event) {
    event.preventDefault();
    this.props.dispatch(toggleMainPage());
  }
  render() {
    return (
      <nav>
        <div className="row">
          {isLoggedIn() &&
            this.props.togglePage && (
              <button onClick={e => this.onClick(e)}>Click to List Food</button>
            )}
          {isLoggedIn() &&
            !this.props.togglePage && (
              <button onClick={e => this.onClick(e)}>
                Click to Claim Food
              </button>
            )}
        </div>
        <div className="row login-row">
          {isLoggedIn() ? (
            <button
              className="btn btn-danger log"
              onClick={() => logout().then(this.props.history.push("/"))}
            >
              Log out{" "}
            </button>
          ) : (
            <button className="btn btn-info log" onClick={() => login()}>
              Log In
            </button>
          )}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({ togglePage: state.togglePage });
export default connect(mapStateToProps)(NavBar);
