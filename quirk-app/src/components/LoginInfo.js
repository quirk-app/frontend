import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Refresh from "./Refresh";

const QUERY = gql`
  query login($form: LoginInput!){
    login(credentials: $form) {
      success
      error
      token
    }
  }
`;

class LoginInfo extends Component {
  state = {
    user: "",
    pass: "",
    error: ""
  }

  newState = (error) => {
    this.setState({
      user: "",
      pass: "",
      error: error
    });
  }

  render (){
    if((this.state.user === "") && (this.state.pass === "")){
      return (
        <div >
          <div className="header shadow text-light display-4">Quirk</div>

          <div style={{textAlign: 'center'}}>
            <form className="card signup shadow-sm"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("HELLLLLLLL");
              this.setState({
                user: e.target.elements.user.value,
                pass: e.target.elements.pass.value
              });

              } }>
              <div className="form-group card-body mb-0">
                <label className="lead">Username</label>
                <input className="form-control" type="text" name="user" />
              </div>

              <div className="form-group card-body mb-0">
                <label className="lead">Password</label>
                <input className="form-control" type="password" name="pass" />
              </div>

              <div className="form-group card-body mb-0">
                <button className="btn btn-quirk" type="submit">Log In</button>
              </div>

              <div className="form-group card-body mb-0">
                { this.state.error && <p className="lead">{ this.state.error }</p> }
              </div>
            </form>

          </div>
        </div>
      );
    }
    else {
      return (<Query
        query={QUERY}
        variables={ {"form": {"username": this.state.user, "password": this.state.pass}} }
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          console.log(data);
          return <Refresh token={data.login.token} success={data.login.success} setToken={this.props.setToken} newState={this.newState} error={data.login.error}/>
        }}
      </Query>
    );
    }
  }

    /*return (<Query
      query={QUERY}
      variables={ {"form": {"username": props.user, "password": props.pass}} }
    >
      {({ loading, error, data }) => {
        console.log(props.user);
        console.log(props.pass);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        if(data.login.success){
          console.log("here");

          props.login(true);

          return <Redirect to="/home/" />;
        }
        return (
          <div>
            <form onSubmit={props.login(false)}>
              <input type="text" name="user" placeholder="Username..." />
              <input type="text" name="pass" placeholder="Password..." />
              <button>Log In</button>
              { props.error && <p>{ props.error }</p> }
            </form>
          </div>
        );
      }}
    </Query>
  );*/
}

export default LoginInfo;
