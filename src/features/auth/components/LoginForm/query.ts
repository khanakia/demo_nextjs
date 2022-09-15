import { gql } from "graphql-request";

export const authLoginMutation = gql`
  mutation authLogin($input: LoginInput!) {
    authLogin(input: $input) {
     token
    }
  }
`;
