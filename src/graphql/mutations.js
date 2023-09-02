/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStage = /* GraphQL */ `
  mutation CreateStage(
    $input: CreateStageInput!
    $condition: ModelStageConditionInput
  ) {
    createStage(input: $input, condition: $condition) {
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
export const updateStage = /* GraphQL */ `
  mutation UpdateStage(
    $input: UpdateStageInput!
    $condition: ModelStageConditionInput
  ) {
    updateStage(input: $input, condition: $condition) {
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
export const deleteStage = /* GraphQL */ `
  mutation DeleteStage(
    $input: DeleteStageInput!
    $condition: ModelStageConditionInput
  ) {
    deleteStage(input: $input, condition: $condition) {
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
export const createBoda = /* GraphQL */ `
  mutation CreateBoda(
    $input: CreateBodaInput!
    $condition: ModelBodaConditionInput
  ) {
    createBoda(input: $input, condition: $condition) {
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
export const updateBoda = /* GraphQL */ `
  mutation UpdateBoda(
    $input: UpdateBodaInput!
    $condition: ModelBodaConditionInput
  ) {
    updateBoda(input: $input, condition: $condition) {
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
export const deleteBoda = /* GraphQL */ `
  mutation DeleteBoda(
    $input: DeleteBodaInput!
    $condition: ModelBodaConditionInput
  ) {
    deleteBoda(input: $input, condition: $condition) {
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
export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
export const createLoan = /* GraphQL */ `
  mutation CreateLoan(
    $input: CreateLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    createLoan(input: $input, condition: $condition) {
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
export const updateLoan = /* GraphQL */ `
  mutation UpdateLoan(
    $input: UpdateLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    updateLoan(input: $input, condition: $condition) {
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
export const deleteLoan = /* GraphQL */ `
  mutation DeleteLoan(
    $input: DeleteLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    deleteLoan(input: $input, condition: $condition) {
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
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
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
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
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createPaymentAccount = /* GraphQL */ `
  mutation CreatePaymentAccount(
    $input: CreatePaymentAccountInput!
    $condition: ModelPaymentAccountConditionInput
  ) {
    createPaymentAccount(input: $input, condition: $condition) {
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
export const updatePaymentAccount = /* GraphQL */ `
  mutation UpdatePaymentAccount(
    $input: UpdatePaymentAccountInput!
    $condition: ModelPaymentAccountConditionInput
  ) {
    updatePaymentAccount(input: $input, condition: $condition) {
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
export const deletePaymentAccount = /* GraphQL */ `
  mutation DeletePaymentAccount(
    $input: DeletePaymentAccountInput!
    $condition: ModelPaymentAccountConditionInput
  ) {
    deletePaymentAccount(input: $input, condition: $condition) {
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
