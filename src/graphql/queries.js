/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStage = /* GraphQL */ `
  query GetStage($id: ID!) {
    getStage(id: $id) {
      id
      name
      address
      chairman
      chairmanPhoneNumber
      bodas {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStages = /* GraphQL */ `
  query ListStages(
    $filter: ModelStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        chairman
        chairmanPhoneNumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBoda = /* GraphQL */ `
  query GetBoda($id: ID!) {
    getBoda(id: $id) {
      id
      firstname
      othername
      phoneNumber
      mobileMoneyName
      stageIdNumber
      nationalIdNumber
      picOfStageId
      picOfNationalId
      pin
      applications {
        nextToken
        __typename
      }
      loans {
        nextToken
        __typename
      }
      stage {
        id
        name
        address
        chairman
        chairmanPhoneNumber
        createdAt
        updatedAt
        __typename
      }
      type
      createdAt
      updatedAt
      stageBodasId
      __typename
    }
  }
`;
export const listBodas = /* GraphQL */ `
  query ListBodas(
    $filter: ModelBodaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBodas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        stageIdNumber
        nationalIdNumber
        picOfStageId
        picOfNationalId
        pin
        type
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        stageIdNumber
        nationalIdNumber
        picOfStageId
        picOfNationalId
        pin
        type
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      date
      status
      createdAt
      updatedAt
      bodaApplicationsId
      __typename
    }
  }
`;
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        status
        createdAt
        updatedAt
        bodaApplicationsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLoan = /* GraphQL */ `
  query GetLoan($id: ID!) {
    getLoan(id: $id) {
      id
      principal
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        stageIdNumber
        nationalIdNumber
        picOfStageId
        picOfNationalId
        pin
        type
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      startDate
      duration
      loanType
      payments {
        nextToken
        __typename
      }
      status
      createdAt
      updatedAt
      bodaLoansId
      __typename
    }
  }
`;
export const listLoans = /* GraphQL */ `
  query ListLoans(
    $filter: ModelLoanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        principal
        startDate
        duration
        loanType
        status
        createdAt
        updatedAt
        bodaLoansId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      loan {
        id
        principal
        startDate
        duration
        loanType
        status
        createdAt
        updatedAt
        bodaLoansId
        __typename
      }
      paymentAmount
      paymentDate
      method
      account {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      loanPaymentsId
      __typename
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        paymentAmount
        paymentDate
        method
        createdAt
        updatedAt
        loanPaymentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      name
      payments {
        nextToken
        __typename
      }
      openingBalance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        openingBalance
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPaymentAccount = /* GraphQL */ `
  query GetPaymentAccount($id: ID!) {
    getPaymentAccount(id: $id) {
      id
      paymentId
      accountId
      payment {
        id
        paymentAmount
        paymentDate
        method
        createdAt
        updatedAt
        loanPaymentsId
        __typename
      }
      account {
        id
        name
        openingBalance
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPaymentAccounts = /* GraphQL */ `
  query ListPaymentAccounts(
    $filter: ModelPaymentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        paymentId
        accountId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentAccountsByPaymentId = /* GraphQL */ `
  query PaymentAccountsByPaymentId(
    $paymentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentAccountsByPaymentId(
      paymentId: $paymentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        paymentId
        accountId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentAccountsByAccountId = /* GraphQL */ `
  query PaymentAccountsByAccountId(
    $accountId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentAccountsByAccountId(
      accountId: $accountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        paymentId
        accountId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
