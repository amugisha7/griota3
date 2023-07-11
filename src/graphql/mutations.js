/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLoanApplication = /* GraphQL */ `
  mutation CreateLoanApplication(
    $input: CreateLoanApplicationInput!
    $condition: ModelLoanApplicationConditionInput
  ) {
    createLoanApplication(input: $input, condition: $condition) {
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
export const updateLoanApplication = /* GraphQL */ `
  mutation UpdateLoanApplication(
    $input: UpdateLoanApplicationInput!
    $condition: ModelLoanApplicationConditionInput
  ) {
    updateLoanApplication(input: $input, condition: $condition) {
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
export const deleteLoanApplication = /* GraphQL */ `
  mutation DeleteLoanApplication(
    $input: DeleteLoanApplicationInput!
    $condition: ModelLoanApplicationConditionInput
  ) {
    deleteLoanApplication(input: $input, condition: $condition) {
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
export const createLoan = /* GraphQL */ `
  mutation CreateLoan(
    $input: CreateLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    createLoan(input: $input, condition: $condition) {
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
export const updateLoan = /* GraphQL */ `
  mutation UpdateLoan(
    $input: UpdateLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    updateLoan(input: $input, condition: $condition) {
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
export const deleteLoan = /* GraphQL */ `
  mutation DeleteLoan(
    $input: DeleteLoanInput!
    $condition: ModelLoanConditionInput
  ) {
    deleteLoan(input: $input, condition: $condition) {
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
