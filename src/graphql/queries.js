/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDivision = /* GraphQL */ `
  query GetDivision($id: ID!) {
    getDivision(id: $id) {
      id
      name
      district
      chairman
      chairmanPhoneNumber
      viceChairman
      viceChairmanPhoneNumber
      stageGroups {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDivisions = /* GraphQL */ `
  query ListDivisions(
    $filter: ModelDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        district
        chairman
        chairmanPhoneNumber
        viceChairman
        viceChairmanPhoneNumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLoanOffers = /* GraphQL */ `
  query GetLoanOffers($id: ID!) {
    getLoanOffers(id: $id) {
      id
      loanAmount
      loanDurationDays
      instalment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLoanOffers = /* GraphQL */ `
  query ListLoanOffers(
    $filter: ModelLoanOffersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoanOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        loanAmount
        loanDurationDays
        instalment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStageGroup = /* GraphQL */ `
  query GetStageGroup($id: ID!) {
    getStageGroup(id: $id) {
      id
      name
      division {
        id
        name
        district
        chairman
        chairmanPhoneNumber
        viceChairman
        viceChairmanPhoneNumber
        createdAt
        updatedAt
        __typename
      }
      stages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      divisionStageGroupsId
      __typename
    }
  }
`;
export const listStageGroups = /* GraphQL */ `
  query ListStageGroups(
    $filter: ModelStageGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStageGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        divisionStageGroupsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStage = /* GraphQL */ `
  query GetStage($id: ID!) {
    getStage(id: $id) {
      id
      name
      address
      chairman
      chairmanPhoneNumber
      viceChairman
      viceChairmanPhoneNumber
      stageGroup {
        id
        name
        createdAt
        updatedAt
        divisionStageGroupsId
        __typename
      }
      bodas {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      stageGroupStagesId
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
        viceChairman
        viceChairmanPhoneNumber
        createdAt
        updatedAt
        stageGroupStagesId
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
        viceChairman
        viceChairmanPhoneNumber
        createdAt
        updatedAt
        stageGroupStagesId
        __typename
      }
      type
      creditRank
      points
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
        creditRank
        points
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
        creditRank
        points
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      date
      status
      loanAmount
      loanInstalment
      loanDurationDays
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
        loanAmount
        loanInstalment
        loanDurationDays
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
        creditRank
        points
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      startDate
      duration
      loanType
      interestRate
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
        interestRate
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
        interestRate
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
export const getAdminstrator = /* GraphQL */ `
  query GetAdminstrator($id: ID!) {
    getAdminstrator(id: $id) {
      id
      phoneNumber
      firstName
      othrName
      pin
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAdminstrators = /* GraphQL */ `
  query ListAdminstrators(
    $filter: ModelAdminstratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminstrators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phoneNumber
        firstName
        othrName
        pin
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCommitment = /* GraphQL */ `
  query GetCommitment($id: ID!) {
    getCommitment(id: $id) {
      id
      statement
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCommitments = /* GraphQL */ `
  query ListCommitments(
    $filter: ModelCommitmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommitments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        statement
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
