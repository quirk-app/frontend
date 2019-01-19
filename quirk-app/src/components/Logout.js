import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";


function Logout (props) {
  props.setToken("");
  return <Redirect to="/" />;
}


export default Logout;
