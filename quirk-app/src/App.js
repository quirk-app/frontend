import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Intro from "./components/Intro";
import LoginInfo from "./components/LoginInfo";
import SignUp from "./components/SignUp";
import Home from "./components/Home"

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

/*const LogInfo = (props) => {
  let user = "", pass = "";

  return (
    <Query query={QUERY}>
      {({ loading, error, data, login}) => {
        /*if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        /*if(data.login.success){
          console.log("here");

          props.login(true);
          return <p>Shit worked, NIBBA!!!</p>;
        }
        return (
          <div>
            <form onSubmit={e => {
                              e.preventDefault();
                              login({ credentials: {"form": {"username": user, "password": pass}} });
                              user.value = "";
                              pass.value = "";
                            }}>
              <input type="text" ref={node => { user = node; }} placeholder="Username..." />
              <input type="text" ref={node => { pass = node; }} placeholder="Password..." />
              <button>Log In</button>
            </form>
          </div>
        );
      }}
    </Query>
  );
}*/

class App extends Component {
  state = {
    token: ""
  }

  login = (success, token) => async (e) => {
    e.preventDefault();

    console.log(success);

    const user = e.target.elements.user.value;
    const pass = e.target.elements.pass.value;

    if(user && pass){
      if(success){
        this.setState({
          token: token
        });
      }
      else{
        this.setState({
          token: ""
        });
      }
    }
    else{
      this.setState({
        token: ""
      });
    }
  }

  setToken = (newToken) => {
    this.setState({
      token: newToken
    });
    console.log(this.state.token);
  }
  /*
  <LoginInfo error={this.state.error} login={this.login} user={this.state.user} pass={this.state.pass}/>
  <SignUp />
  */

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path='/' component={Intro}/>
            <Route path='/login/' component={() => <LoginInfo setToken={this.setToken} token={this.state.token}/>}/>
            <Route path='/signup/' component={() => <SignUp setToken={this.setToken}/>}/>
            <Route path='/home/' component={() => <Home setToken={this.setToken} token={this.state.token}/>}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
