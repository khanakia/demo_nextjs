import { gql } from "graphql-request";

export const mutate_authLoginSendOtp = gql`
  mutation authLoginSendOtp($input: LoginSendOtpInput!) {
    authLoginSendOtp(input: $input)
  }
`;


export const mutate_authLoginVerifyOtp = gql`
  mutation authLoginVerifyOtp($input: LoginVerifyOtpInput!) {
    authLoginVerifyOtp(input: $input) {
      token
    }
  }
`;