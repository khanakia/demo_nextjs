import { gql } from "graphql-request";

export const authForgotPasswordMutation = gql`
  mutation authForgotPassword($userName: String!) {
    authForgotPassword(userName: $userName)
  }
`;
