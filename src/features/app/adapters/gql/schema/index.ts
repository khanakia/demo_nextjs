import { gql } from "graphql-request";

export const query_me = gql`
  query {
    me {
      id
      createdAt
      phone
      name
      roleId
      parentId
      referralId
      status
      minBet
      maxBet
      rate
      betComm
      refComm
      patti
      parentName
      parentPhone
      referralName
      referralPhone
    }
  }
`; 

export const query_p_user = gql`
  query p_user($id: String!) {
    p_user(id: $id) {
      id
      createdAt
      phone
      name
      roleId
      parentId
      referralId
      status
      minBet
      maxBet
      rate
      betComm
      refComm
      patti
      loginPin
    }
  }
`; 

export const mutation_adm_userCreate = gql`
  mutation adm_userCreate($input: UserInput!) {
    adm_userCreate(input: $input) {
      id
    }
  }
`;

export const mutation_adm_userUpdate = gql`
  mutation adm_userUpdate($id: String!, $input: UserInput!) {
    adm_userUpdate(id: $id, input: $input)
  }
`;

export const mutation_adm_createLoginToken = gql`
  mutation adm_createLoginToken($id: String!) {
    adm_createLoginToken(id: $id) {
      token
    }
  }
`;

export const mutation_agent_userCreate = gql`
  mutation agent_userCreate($input: AgentUserInput!) {
    agent_userCreate(input: $input) {
      id
    }
  }
`;

export const mutation_agent_userUpdate = gql`
  mutation agent_userUpdate($id: String!, $input: AgentUserInput!) {
    agent_userUpdate(id: $id, input: $input)
  }
`;

export const query_p_paymentMethods = gql`
  query {
    p_paymentMethods {
      id
      name
      status
      accNo
      accName
      bankName
      ifsc
      accTypeId
    }
  }
`

export const query_p_paymentMethod = gql`
  query p_paymentMethod($id: String!) {
    p_paymentMethod(id: $id) {
      id
      name
      status
      accNo
      accName
      bankName
      ifsc
      accTypeId
    }
  }
`; 

export const mutation_p_paymentMethodCreate = gql`
  mutation p_paymentMethodCreate($input: PaymentMethodInput!) {
    p_paymentMethodCreate(input: $input)
  }
`;

export const mutation_p_paymentMethodUpdate = gql`
  mutation p_paymentMethodUpdate($id: String!, $input: PaymentMethodInput!) {
    p_paymentMethodUpdate(id: $id, input: $input)
  }
`;

export const query_p_paymentRequests = gql`
  query p_paymentRequests($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    p_paymentRequests(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        createdAt
        paymentMethodId
        userID
        amount
        statusId
        note
        toUserId
        toUserPhone
        paymentMethodName
      }
      total
    }
  }
`

export const query_p_paymentRequest = gql`
  query p_paymentRequest($id: String!) {
    p_paymentRequest(id: $id) {
      id
      createdAt
      paymentMethodId
      userID
      amount
      statusId
      note
      toUserId
      toUserPhone
      paymentMethodName
    }
  }
`

export const mutation_p_paymentRequestCreate = gql`
  mutation p_paymentRequestCreate($input: PaymentRequestInput!) {
    p_paymentRequestCreate(input: $input)
  }
`;

export const mutation_p_paymentRequestProcess = gql`
  mutation p_paymentRequestProcess($id: String!, $input: PaymentRequestProcessInput!) {
    p_paymentRequestProcess(id: $id, input: $input)
  }
`;

export const query_p_paymentRequestByChild = gql`
  query p_paymentRequestByChild($id: String!) {
    p_paymentRequestByChild(id: $id) {
      id
      createdAt
      paymentMethodId
      userID
      amount
      statusId
      note
      toUserId
      toUserPhone
      paymentMethodName
      paymentMethod {
        id
        name
        status
        accNo
        accName
        bankName
        ifsc
        accTypeId
      }
    }
  }
`

export const query_p_paymentRequestsByChilds = gql`
  query p_paymentRequestsByChilds($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    p_paymentRequestsByChilds(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        createdAt
        paymentMethodId
        userID
        amount
        statusId
        note
        internalNote
        paymentMethodName
        userPhone
      }
      total
    }
  }
`

export const mutation_p_walletToWalletTransfer = gql`
  mutation p_walletToWalletTransfer($input: WalletToWalletTransferInput!) {
    p_walletToWalletTransfer(input: $input)
  }
`;


export const query_p_ledgers = gql`
  query p_ledgers($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    p_ledgers(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        createdAt
        companyId
        userId
        gameId
        # sessionId
        amount
        ref
        refId
        ref2
        ref2Id
        ref3
        ref3Id
        note
        internalNote
        companyName
        userPhone
        gameName
        sessionName
      }
      total
    }
  }
`

export const query_p_ledgerBalanceByChilds = gql`
  query p_ledgerBalanceByChilds($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    p_ledgerBalanceByChilds(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        userId
        userPhone
        total
      }
      total
    }
  }
`

export const query_p_legerBalance = gql`
  query {
    p_legerBalance
  }
`

export const query_mk_adm_channels = gql`
  query {
    mk_adm_channels {
      id
      companyId
      name
      status
      descr
    }
  }
`

export const query_mk_adm_channel = gql`
  query mk_adm_channel($id: String!) {
    mk_adm_channel(id: $id) {
      id
      companyId
      name
      status
      descr
    }
  }
`; 

export const mutation_mk_adm_channelCreate = gql`
  mutation mk_adm_channelCreate($input: MkChannelInput!) {
    mk_adm_channelCreate(input: $input)
  }
`;

export const mutation_mk_adm_channelUpdate = gql`
  mutation mk_adm_channelUpdate($id: String!, $input: MkChannelInput!) {
    mk_adm_channelUpdate(id: $id, input: $input)
  }
`;

export const query_mk_p_sessions = gql`
  query mk_p_sessions($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    mk_p_sessions(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        companyId
        channelId
        name
        statusId
        startTime
        endTime
        resultJodi
        resultHarf
        resultAndarHarf
        channelName
      }
      total
    }
  }
`

export const query_mk_p_session = gql`
  query mk_p_session($id: String!) {
    mk_p_session(id: $id) {
      id
      companyId
      channelId
      name
      statusId
      startTime
      endTime
      resultJodi
      resultHarf
      resultAndarHarf
      channelName
    }
  }
`; 

export const mutation_mk_adm_sessionCreate = gql`
  mutation mk_adm_sessionCreate($input: MkSessionInput!) {
    mk_adm_sessionCreate(input: $input)
  }
`;

export const mutation_mk_adm_sessionUpdate = gql`
  mutation mk_adm_sessionUpdate($id: String!, $input: MkSessionInput!) {
    mk_adm_sessionUpdate(id: $id, input: $input)
  }
`;

export const mutation_mk_adm_declareSession = gql`
  mutation mk_adm_declareSession($id: String!, $num: Int!) {
    mk_adm_declareSession(id: $id, num: $num)
  }
`;

export const mutation_mk_adm_unDeclareSession = gql`
  mutation mk_adm_unDeclareSession($id: String!) {
    mk_adm_unDeclareSession(id: $id)
  }
`;

export const mutation_mk_adm_sessionArchive = gql`
  mutation mk_adm_sessionArchive($id: String!) {
    mk_adm_sessionArchive(id: $id)
  }
`;

export const query_mk_p_sessionEntries = gql`
  query mk_p_sessionEntries($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    mk_p_sessionEntries(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        id
        companyId
        channelId
        sessionId
        userId
        numTypeId
        amount
        num
        rate
        betComm
        winAmt
        betCommAmt
        adminAmount
        adminRate
        adminBetComm
        adminWinAmt
        adminBetCommAmt
        agentPatti
        adminPatti
        finalAmt
        statusId
        channelName
        sessionName
        numTypeName
        userPhone
      }
      total
    }
  }
`

export const query_mk_agent_totalBetForEachChild = gql`
  query mk_agent_totalBetForEachChild($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    mk_agent_totalBetForEachChild(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        channelId
        channelName
        sessionId
        sessionName
        startTime
        userId
        userPhone
        totalBet
      }
      total
    }
  }
`

export const query_mk_adm_totalBetForEachChild = gql`
  query mk_adm_totalBetForEachChild($offset: Int! = 0, $limit: Int! = 10, $orderBy: [SortOrderInput!] = [], $filters: [FilterInput!]) {
    mk_adm_totalBetForEachChild(offset: $offset, limit: $limit, orderBy: $orderBy, filters: $filters) {
      nodes {
        channelId
        channelName
        sessionId
        sessionName
        startTime
        userId
        userPhone
        totalBet
      }
      total
    }
  }
`

export const mutation_mk_p_sessionEntryBet = gql`
  mutation mk_p_sessionEntryBet($input: MkSessionEntryBetInput!) {
    mk_p_sessionEntryBet(input: $input)
  }
`;

export const query_mk_p_jantri = gql`
  query mk_p_jantri($input: MkPJantriInput!) {
    mk_p_jantri(input: $input)
  }
`

export const query_mk_adm_jantri = gql`
  query mk_adm_jantri($input: MkAdmJantriInput!) {
    mk_adm_jantri(input: $input)
  }
`

export const query_mk_agent_jantri = gql`
  query mk_agent_jantri($input: MkAgentJantriInput!) {
    mk_agent_jantri(input: $input)
  }
`

export const query_pub_company = gql`
  query pub_company($id: String!) {
    pub_company(id: $id) {
      id
      name
      status
    }
  }
`; 