import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";


function Refresh (props) {
  if(props.success){
    props.setToken(props.token);
    return <Redirect to="/home/" />;
  }
  else {
    props.newState(props.error);

    return <Redirect to="/login/" />;
  }
}


export default Refresh;
