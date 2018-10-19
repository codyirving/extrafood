import React, { Component } from "react";
import { login } from "../utils/AuthService";
class welcome extends Component {
  render() {
    return (
      <div className="container welcome-component light-blue-text h2-responsive">
        <div className="welcome-logo myrow"></div>
        <p className="display-4">Welcome to EXTRA FOOD! </p>

        <p className="green-text">A place to give your extra food away, to
        those who need it!</p>

        <p className="black-text">Have a little extra food that you don't want to go to waste?</p><p className="black-text"> Just post
        some details about the item, and how to pick it up! It's that simple.{" "}
        </p>

        <p className="deep-orange-text"> A place to get extra food, when you need it!</p>
        <p className="black-text">
          Need a little extra food this week? We hear you! </p><p className="black-text">Check out the listings,
          and maybe there is something that will help you out! With so much extra
          food out there, hunger shouldn't be your biggest worry.
        </p>
        <p>
          Just <button className="btn-floating btn-lg btn-info" onClick={() => login()}>SIGN UP</button> to be a part of ExtraFood, today!
        </p>
      </div>
    );
  }
}

export default welcome;
