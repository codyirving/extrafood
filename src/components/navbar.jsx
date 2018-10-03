import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMainPage, updateUserInfo } from "../actions/index";
import decode from "jwt-decode";
import {
  login,
  logout,
  isLoggedIn,
  getAccessToken,
  getManagementToken,
  getIdToken
} from "../utils/AuthService";
export class NavBar extends Component {
  state = {
    userInfo: []
  };
  onClick(event) {
    event.preventDefault();
    this.props.dispatch(toggleMainPage());
  }

  async componentDidMount() {
    console.log("PROCESS.ENV:" + JSON.stringify(process.env));
    const idToken = getIdToken();
    try {
      console.log("ID TOKEN: " + JSON.stringify(decode(idToken)));
      console.log("Got Token!: " + idToken);
    } catch (e) {
      console.log("error", e);
    }
    if (idToken) {
      const userInfo = decode(idToken);
      this.setState({ userInfo: userInfo });
      this.props.dispatch(updateUserInfo(userInfo));
    }
  }
  render() {
    return (
      <nav>
        <div className="user-welcome">
          {isLoggedIn() && <div>Welcome, {this.state.userInfo.name}</div>}
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
        <div className="row toggle-button-container">
          <div className="col-6">
            {isLoggedIn() &&
              this.props.togglePage && (
                <button
                  className="toggle-button"
                  onClick={e => this.onClick(e)}
                >
                  Click to List Food
                </button>
              )}
            {isLoggedIn() &&
              !this.props.togglePage && (
                <button
                  className="toggle-button"
                  onClick={e => this.onClick(e)}
                >
                  Click to Claim Food
                </button>
              )}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({ togglePage: state.togglePage });
export default connect(mapStateToProps)(NavBar);
