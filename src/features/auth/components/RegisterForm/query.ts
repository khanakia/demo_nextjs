import { gql } from "graphql-request";

export const authRegisterMutation = gql`
  mutation authRegister($input: RegisterInput!) {
    authRegister(input: $input) {
     token
    }
  }
`;
