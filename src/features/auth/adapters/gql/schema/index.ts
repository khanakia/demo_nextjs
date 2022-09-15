import { gql } from "graphql-request";

export const query_p_users = gql`
  query p_users($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    p_users(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        createdAt
        phone
        name
        status
        minBet
        maxBet
        rate
        betComm
        refComm
        patti
        parentId
        roleId
        referralId
        parentPhone
        referralPhone
      }
      total
    }
  }
`