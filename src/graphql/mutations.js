/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLoanApplication = /* GraphQL */ `
  mutation CreateLoanApplication(
    $input: CreateLoanApplicationInput!
    $condition: ModelLoanApplicationConditionInput
  ) {
    createLoanApplication(input: $input, condition: $condition) {
      id
      name
      profilepic
      createdAt
      updatedAt
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
      name
      profilepic
      createdAt
      updatedAt
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
      name
      profilepic
      createdAt
      updatedAt
    }
  }
`;
