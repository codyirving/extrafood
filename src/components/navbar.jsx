import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMainPage } from "../actions/index";

export class NavBar extends Component {
  onClick(event) {
    event.preventDefault();
    this.props.dispatch(toggleMainPage());
  }
  render() {
    return (
      <nav>
        {this.props.toggleButton && (
          <button onClick={e => this.onClick(e)}>Click to List Food</button>
        )}
        {!this.props.toggleButton && (
          <button onClick={e => this.onClick(e)}>Click to Claim Food</button>
        )}
      </nav>
    );
  }
}
const mapStateToProps = state => ({ toggleButton: state.toggleButton });
export default connect(mapStateToProps)(NavBar);
