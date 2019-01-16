import React, { Component } from 'react';

import Title from "./components/Title";
import LoginInfo from "./components/LoginInfo";
import SignUp from "./components/SignUp";

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
    logged: false,
    user: "",
    pass: "",
    error: "",
  }

  login = (success) => async (e) => {
    e.preventDefault();

    console.log(success);

    const user = e.target.elements.user.value;
    const pass = e.target.elements.pass.value;

    if(user && pass){
      if(success){
        this.setState({
          logged: success,
          user: user,
          pass: pass,
          error: ""
        });
      }
      else{
        this.setState({
          logged: false,
          user: user,
          pass: pass,
          error: "Incorrect Username or Password"
        });
      }
    }
    else{
      this.setState({
        logged: false,
        user: "",
        pass: "",
        error: "Incorrect Username or Password"
      });
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Title />
          <LoginInfo error={this.state.error} login={this.login} user={this.state.user} pass={this.state.pass}/>
          <SignUp />
          {console.log(this.state)}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
