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
      }
      nextToken
    }
  }
`;
