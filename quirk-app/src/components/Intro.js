import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Intro extends Component {
  render() {
    return (
      <div>
        <div className="box shadow"></div>
        <h1 className="text-light display-1 title">Quirk</h1>
        <h3 className="display-5 main__text">Find out about people's Quirks around the world</h3>
        <Link to="/login/">
          <button className="btn log__button btn-outline-quirk">Log In</button>
        </Link>
        <h3 className="display-5 main__text__below">...And tell the world yours!</h3>
        <Link to="/signup/">
          <button className="btn sign__button btn-quirk">Sign Up</button>
        </Link>
      </div>
    );
  }
}

export default Intro;
