import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import Logout from "./Logout"

import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY_USER = gql`
  query user {
    user{
      username
    }
  }
`;

class Home extends Component {
  state = {
    logout: false
  }


  render(){
    if(this.props.token === ""){
      return <Logout setToken={this.props.setToken} />
    }
    return  (
      <div>
        <div className="header shadow text-light display-4">Quirk</div>
          <Query
            query={QUERY_USER}
            context={{
                      "headers": {"authorization": this.props.token}
                     }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Redirect to="/login/" />;

              console.log(data);
              console.log(this.props.token);
              return (<div className="card user shadow-sm">
                        <h3 className="mt-3 mb-0"> { data.user.username } </h3>
                        <div className="card-body stat lead pt-2">
                          <label>Posts: </label>
                        </div>
                        <div className="card-body stat lead py-0">
                          <label>Votes: </label>
                        </div>

                        <div>
                          <button className="btn btn-outline-quirk" onClick={ () => this.setState({ logout: true }) }>Logout</button>
                          {this.state.logout && <Logout setToken={this.props.setToken} /> }
                        </div>
                      </div>);
            }}
          </Query>

        <div className="card trend shadow-sm">
          <h3 className="mt-3 mb-0">Trending</h3>
        </div>


      </div>
    );
  }

}

export default Home;

/*
<Link to="/">
  <button className="btn btn-outline-quirk" onClick={props.setToken("")}>Logout</button>
</Link>
*/
