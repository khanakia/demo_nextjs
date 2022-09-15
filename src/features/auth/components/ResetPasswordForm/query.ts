import { gql } from "graphql-request";

export const authResetPasswordMutation = gql`
  mutation authResetPassword($token: String!, $password: String!) {
    authResetPassword(token: $token, password: $password) {
     token
    }
  }
`;
