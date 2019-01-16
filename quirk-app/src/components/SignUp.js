import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const NEW_USER = gql`
  mutation newUser($user: NewUserInput!) {
    newUser(input: $user) {
      success
      error
      user {
        username
        email
        gender
        birthday
      }
    }
  }
`;

const SignUp = () => {
  let user, pass, email, gender, birthday;

  return (
    <Mutation mutation={NEW_USER}>
      {(newUser, { data }) => (
        <div>
          <form
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
                      "birthday": birthday.value
                    }
                  }
                });
              user.value = "";
              pass.value = "";
              email.value = "";
              gender.value = "";
              birthday.value = "";
            }}
          >
            <input
              ref={node => {
                user = node;
              }}

              placeholder="Username..."
            />
            <input
              ref={node => {
                pass = node;
              }}

              placeholder="Password..."
            />
            <input
              ref={node => {
                email = node;
              }}

              placeholder="Email..."
            />
            <input
              ref={node => {
                gender = node;
              }}

              placeholder="Gender..."
            />
            <input
              ref={node => {
                birthday = node;
              }}

              placeholder="Birthday..."
            />
            <button type="submit">Create Account</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default SignUp;
