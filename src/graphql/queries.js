/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoanApplication = /* GraphQL */ `
  query GetLoanApplication($id: ID!) {
    getLoanApplication(id: $id) {
      id
      name
      profilepic
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
        name
        profilepic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
