import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DatePicker from "react-datepicker";
import Refresh from "./Refresh";

import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

const NEW_USER = gql`
  mutation newUser($user: NewUserInput!) {
    newUser(input: $user) {
      success
      error
      token
    }
  }
`;

const SignUp = (props) => {
  let user = "", pass = "", email = "", gender = "", birthday = 0;
  let date = new Date();

  return (
    <Mutation mutation={NEW_USER}>
      {(newUser, { data }) => {
        console.log(data);

        if(data && data.newUser.success){
          return <Refresh token={data.newUser.token} success={true} setToken={props.setToken}/>
        }

        return  (<div>
            <div className="header shadow text-light display-4">Quirk</div>

            <div style={{textAlign: 'center'}}>
              <form className="card signup shadow-sm"
                onSubmit={e => {
                  e.preventDefault();
                  newUser(
                    { variables:
                      { "user":
                        {
                          "username": user.value,
                          "password": pass.value,
                          "email": email.value,
                          "gender": gender.value,
                          "birthday": "0"
                        }
                      }
                    });
                }}
              >
                <div className="form-group card-body mb-0">
                  <label className="lead">Username</label>
                  <input ref={node => {
                                user = node;
                              }}
                  type="text" className="form-control"/>
                </div>

                <div className="form-group card-body mb-0">
                  <label className="lead">Password</label>
                  <input ref={node => {
                                pass = node;
                              }}
                  type="password" className="form-control"/>
                </div>

                <div className="form-group card-body mb-0">
                  <label className="lead">Email</label>
                  <input ref={node => {
                                email = node;
                              }}
                  type="email" className="form-control"/>
                </div>

                <div className="form-group card-body mb-0">
                  <label className="lead">Gender</label>
                  <select className="form-control">
                    <option ref={node => {
                              gender = "MALE";
                            }}>
                      Male
                    </option>
                    <option ref={node => {
                              gender = "FEMALE";
                            }}>
                      Female
                    </option>
                    <option ref={node => {
                              gender = "OTHER";
                            }}>
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group card-body mb-0">
                  <label className="lead">Birthday</label>
                  <DatePicker selected={date} onChange={value => {
                            console.log(value);
                            birthday = value;
                          }} />
                </div>


                <div className="form-group card-body mb-0">
                  <button className="btn btn-quirk" type="submit">Create Account</button>
                </div>
              </form>
            </div>
          </div>
        );}
      }
    </Mutation>
  );
};

export default SignUp;
