/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoanApplication = /* GraphQL */ `
  query GetLoanApplication($id: ID!) {
    getLoanApplication(id: $id) {
      id
      phoneNumber
      salesLastWeek
      salesBeforeLastWeek
      businessActivity
      selectedBusinessType
      selectedBusinessLocation
      businessAreaPicBlob
      ownerInBusinessPicBlob
      outsideOfBusinessPicBlob
      durationInBsuiness
      age
      nationalIDFrontPicBlob
      fullName
      nationalIDNumber
      nextOfKinName
      nextOfKinRelationship
      nextOfKinPhoneNumber
      referee1Name
      referee1PhoneNumber
      referee1KnownPeriod
      NINofReferee1
      ref1NationalIDPic
      referee2Name
      referee2PhoneNumber
      referee2KnownPeriod
      NINofReferee2
      ref2NationalIDPic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLoanApplications = /* GraphQL */ `
  query ListLoanApplications(
    $filter: ModelLoanApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoanApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        salesLastWeek
        salesBeforeLastWeek
        businessActivity
        selectedBusinessType
        selectedBusinessLocation
        businessAreaPicBlob
        ownerInBusinessPicBlob
        outsideOfBusinessPicBlob
        durationInBsuiness
        age
        nationalIDFrontPicBlob
        fullName
        nationalIDNumber
        nextOfKinName
        nextOfKinRelationship
        nextOfKinPhoneNumber
        referee1Name
        referee1PhoneNumber
        referee1KnownPeriod
        NINofReferee1
        ref1NationalIDPic
        referee2Name
        referee2PhoneNumber
        referee2KnownPeriod
        NINofReferee2
        ref2NationalIDPic
        createdAt
        updatedAt
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
      picOfStageId
      pin
      applications {
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
        picOfStageId
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
        picOfStageId
        pin
        type
        createdAt
        updatedAt
        stageBodasId
        __typename
      }
      date
      status
      loan {
        id
        principal
        startDate
        duration
        loanType
        status
        createdAt
        updatedAt
        loanApplicationId
        __typename
      }
      createdAt
      updatedAt
      bodaApplicationsId
      applicationLoanId
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
        applicationLoanId
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
      application {
        id
        date
        status
        createdAt
        updatedAt
        bodaApplicationsId
        applicationLoanId
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
      loanApplicationId
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
        loanApplicationId
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
        loanApplicationId
        __typename
      }
      amount
      date
      method
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
        amount
        date
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
