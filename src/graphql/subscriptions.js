/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLoanApplication = /* GraphQL */ `
  subscription OnCreateLoanApplication(
    $filter: ModelSubscriptionLoanApplicationFilterInput
  ) {
    onCreateLoanApplication(filter: $filter) {
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
export const onUpdateLoanApplication = /* GraphQL */ `
  subscription OnUpdateLoanApplication(
    $filter: ModelSubscriptionLoanApplicationFilterInput
  ) {
    onUpdateLoanApplication(filter: $filter) {
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
export const onDeleteLoanApplication = /* GraphQL */ `
  subscription OnDeleteLoanApplication(
    $filter: ModelSubscriptionLoanApplicationFilterInput
  ) {
    onDeleteLoanApplication(filter: $filter) {
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
export const onUpdateBoda = /* GraphQL */ `
  subscription OnUpdateBoda($filter: ModelSubscriptionBodaFilterInput) {
    onUpdateBoda(filter: $filter) {
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
export const onDeleteBoda = /* GraphQL */ `
  subscription OnDeleteBoda($filter: ModelSubscriptionBodaFilterInput) {
    onDeleteBoda(filter: $filter) {
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
export const onCreateLoan = /* GraphQL */ `
  subscription OnCreateLoan($filter: ModelSubscriptionLoanFilterInput) {
    onCreateLoan(filter: $filter) {
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
export const onUpdateLoan = /* GraphQL */ `
  subscription OnUpdateLoan($filter: ModelSubscriptionLoanFilterInput) {
    onUpdateLoan(filter: $filter) {
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
export const onDeleteLoan = /* GraphQL */ `
  subscription OnDeleteLoan($filter: ModelSubscriptionLoanFilterInput) {
    onDeleteLoan(filter: $filter) {
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
