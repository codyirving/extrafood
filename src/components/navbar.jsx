import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMainPage, updateUserInfo } from "../actions/index";
import decode from "jwt-decode";
import { login, logout, isLoggedIn, getIdToken } from "../utils/AuthService";
export class NavBar extends Component {
  state = {
    userInfo: []
  };
  onClick(event) {
    event.preventDefault();
    this.props.dispatch(toggleMainPage());
  }

  async componentDidMount() {
    //console.log("PROCESS.ENV:" + JSON.stringify(process.env));
    const idToken = getIdToken();

    if (idToken) {
      const userInfo = decode(idToken);
      this.setState({ userInfo: userInfo });
      this.props.dispatch(updateUserInfo(userInfo));
    }
  }
  render() {
    return (
      <nav className="container">
        <div className="row myrow">
          <div className="user-welcome">
            {isLoggedIn() && (
              <div className="uinfo">
                <div className="black-text">
                  {" "}
                  Welcome, {this.state.userInfo.name}
                </div>
                <div className="user-photo">
                  <img src={this.state.userInfo.picture} alt="user-avatar" />{" "}
                </div>
              </div>
            )}
          </div>
          <div className="">
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
        </div>
        <div className="row toggle">
          {isLoggedIn() &&
            this.props.togglePage && (
              <button
                className="btn btn-deep-orange col-12"
                onClick={e => this.onClick(e)}
              >
                Click to List Food
              </button>
            )}
          {isLoggedIn() &&
            !this.props.togglePage && (
              <button
                className="btn btn-deep-orange col-12"
                onClick={e => this.onClick(e)}
              >
                Click to Claim Food
              </button>
            )}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({ togglePage: state.togglePage });
export default connect(mapStateToProps)(NavBar);
