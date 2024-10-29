import { gql } from "@apollo/client";

const LOGIN_ADMIN = gql`
  query AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      admin {
        name
      }
    }
  }
`;

export default LOGIN_ADMIN;
