import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query login($form: LoginInput!){
    login(credentials: $form) {
      success
      error
    }
  }
`;

function LoginInfo (props) {
    if((props.user === "") || (props.pass === "")){
      return (
        <div>
          { console.log(props.error) }
          <form onSubmit={props.login(false)}>
            <input type="text" name="user" placeholder="Username..." />
            <input type="text" name="pass" placeholder="Password..." />
            <button>Log In</button>
          </form>
          { props.error && <p>{ props.error }</p> }
        </div>
      );
    }
    return (<Query
      query={QUERY}
      variables={ {"form": {"username": props.user, "password": props.pass}} }
    >
      {({ loading, error, data}) => {
        console.log(props.user);
        console.log(props.pass);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        if(data.login.success){
          console.log("here");

          props.login(true);
          return <p>Shit worked, NIBBA!!!</p>;
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
  );
}

export default LoginInfo;
