import React, { Component } from "react";

const NavBar = props => {
  console.log("navbar -rendered");
  return (
    <nav>
      <a>{props.numberOfItems}</a>
    </nav>
  );
};

export default NavBar;
