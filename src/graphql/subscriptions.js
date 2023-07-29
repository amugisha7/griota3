/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStage = /* GraphQL */ `
  subscription OnCreateStage($filter: ModelSubscriptionStageFilterInput) {
    onCreateStage(filter: $filter) {
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
export const onUpdateStage = /* GraphQL */ `
  subscription OnUpdateStage($filter: ModelSubscriptionStageFilterInput) {
    onUpdateStage(filter: $filter) {
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
export const onDeleteStage = /* GraphQL */ `
  subscription OnDeleteStage($filter: ModelSubscriptionStageFilterInput) {
    onDeleteStage(filter: $filter) {
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
export const onCreateBoda = /* GraphQL */ `
  subscription OnCreateBoda($filter: ModelSubscriptionBodaFilterInput) {
    onCreateBoda(filter: $filter) {
      id
      firstname
      othername
      phoneNumber
      mobileMoneyName
      idNumber
      picOfStageId
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
export const onUpdateBoda = /* GraphQL */ `
  subscription OnUpdateBoda($filter: ModelSubscriptionBodaFilterInput) {
    onUpdateBoda(filter: $filter) {
      id
      firstname
      othername
      phoneNumber
      mobileMoneyName
      idNumber
      picOfStageId
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
export const onDeleteBoda = /* GraphQL */ `
  subscription OnDeleteBoda($filter: ModelSubscriptionBodaFilterInput) {
    onDeleteBoda(filter: $filter) {
      id
      firstname
      othername
      phoneNumber
      mobileMoneyName
      idNumber
      picOfStageId
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
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
      id
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
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
      createdAt
      updatedAt
      bodaApplicationsId
      __typename
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
      id
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
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
      createdAt
      updatedAt
      bodaApplicationsId
      __typename
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
      id
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
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
      createdAt
      updatedAt
      bodaApplicationsId
      __typename
    }
  }
`;
export const onCreateLoan = /* GraphQL */ `
  subscription OnCreateLoan($filter: ModelSubscriptionLoanFilterInput) {
    onCreateLoan(filter: $filter) {
      id
      principal
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
        picOfStageId
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
export const onUpdateLoan = /* GraphQL */ `
  subscription OnUpdateLoan($filter: ModelSubscriptionLoanFilterInput) {
    onUpdateLoan(filter: $filter) {
      id
      principal
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
        picOfStageId
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
export const onDeleteLoan = /* GraphQL */ `
  subscription OnDeleteLoan($filter: ModelSubscriptionLoanFilterInput) {
    onDeleteLoan(filter: $filter) {
      id
      principal
      boda {
        id
        firstname
        othername
        phoneNumber
        mobileMoneyName
        idNumber
        picOfStageId
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onCreatePayment(filter: $filter) {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onUpdatePayment(filter: $filter) {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onDeletePayment(filter: $filter) {
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
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
export const onCreatePaymentAccount = /* GraphQL */ `
  subscription OnCreatePaymentAccount(
    $filter: ModelSubscriptionPaymentAccountFilterInput
  ) {
    onCreatePaymentAccount(filter: $filter) {
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
export const onUpdatePaymentAccount = /* GraphQL */ `
  subscription OnUpdatePaymentAccount(
    $filter: ModelSubscriptionPaymentAccountFilterInput
  ) {
    onUpdatePaymentAccount(filter: $filter) {
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
export const onDeletePaymentAccount = /* GraphQL */ `
  subscription OnDeletePaymentAccount(
    $filter: ModelSubscriptionPaymentAccountFilterInput
  ) {
    onDeletePaymentAccount(filter: $filter) {
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
