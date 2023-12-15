/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDivision = /* GraphQL */ `
  subscription OnCreateDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onCreateDivision(filter: $filter) {
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
export const onUpdateDivision = /* GraphQL */ `
  subscription OnUpdateDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onUpdateDivision(filter: $filter) {
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
export const onDeleteDivision = /* GraphQL */ `
  subscription OnDeleteDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onDeleteDivision(filter: $filter) {
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
export const onCreateLoanOffers = /* GraphQL */ `
  subscription OnCreateLoanOffers(
    $filter: ModelSubscriptionLoanOffersFilterInput
  ) {
    onCreateLoanOffers(filter: $filter) {
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
export const onUpdateLoanOffers = /* GraphQL */ `
  subscription OnUpdateLoanOffers(
    $filter: ModelSubscriptionLoanOffersFilterInput
  ) {
    onUpdateLoanOffers(filter: $filter) {
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
export const onDeleteLoanOffers = /* GraphQL */ `
  subscription OnDeleteLoanOffers(
    $filter: ModelSubscriptionLoanOffersFilterInput
  ) {
    onDeleteLoanOffers(filter: $filter) {
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
export const onCreateStageGroup = /* GraphQL */ `
  subscription OnCreateStageGroup(
    $filter: ModelSubscriptionStageGroupFilterInput
  ) {
    onCreateStageGroup(filter: $filter) {
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
export const onUpdateStageGroup = /* GraphQL */ `
  subscription OnUpdateStageGroup(
    $filter: ModelSubscriptionStageGroupFilterInput
  ) {
    onUpdateStageGroup(filter: $filter) {
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
export const onDeleteStageGroup = /* GraphQL */ `
  subscription OnDeleteStageGroup(
    $filter: ModelSubscriptionStageGroupFilterInput
  ) {
    onDeleteStageGroup(filter: $filter) {
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
export const onCreateStage = /* GraphQL */ `
  subscription OnCreateStage($filter: ModelSubscriptionStageFilterInput) {
    onCreateStage(filter: $filter) {
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
export const onUpdateStage = /* GraphQL */ `
  subscription OnUpdateStage($filter: ModelSubscriptionStageFilterInput) {
    onUpdateStage(filter: $filter) {
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
export const onDeleteStage = /* GraphQL */ `
  subscription OnDeleteStage($filter: ModelSubscriptionStageFilterInput) {
    onDeleteStage(filter: $filter) {
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
export const onCreateBoda = /* GraphQL */ `
  subscription OnCreateBoda($filter: ModelSubscriptionBodaFilterInput) {
    onCreateBoda(filter: $filter) {
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
export const onUpdateBoda = /* GraphQL */ `
  subscription OnUpdateBoda($filter: ModelSubscriptionBodaFilterInput) {
    onUpdateBoda(filter: $filter) {
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
export const onDeleteBoda = /* GraphQL */ `
  subscription OnDeleteBoda($filter: ModelSubscriptionBodaFilterInput) {
    onDeleteBoda(filter: $filter) {
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
export const onCreateAdminstrator = /* GraphQL */ `
  subscription OnCreateAdminstrator(
    $filter: ModelSubscriptionAdminstratorFilterInput
  ) {
    onCreateAdminstrator(filter: $filter) {
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
export const onUpdateAdminstrator = /* GraphQL */ `
  subscription OnUpdateAdminstrator(
    $filter: ModelSubscriptionAdminstratorFilterInput
  ) {
    onUpdateAdminstrator(filter: $filter) {
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
export const onDeleteAdminstrator = /* GraphQL */ `
  subscription OnDeleteAdminstrator(
    $filter: ModelSubscriptionAdminstratorFilterInput
  ) {
    onDeleteAdminstrator(filter: $filter) {
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
export const onCreateCommitment = /* GraphQL */ `
  subscription OnCreateCommitment(
    $filter: ModelSubscriptionCommitmentFilterInput
  ) {
    onCreateCommitment(filter: $filter) {
      id
      statement
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommitment = /* GraphQL */ `
  subscription OnUpdateCommitment(
    $filter: ModelSubscriptionCommitmentFilterInput
  ) {
    onUpdateCommitment(filter: $filter) {
      id
      statement
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommitment = /* GraphQL */ `
  subscription OnDeleteCommitment(
    $filter: ModelSubscriptionCommitmentFilterInput
  ) {
    onDeleteCommitment(filter: $filter) {
      id
      statement
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
