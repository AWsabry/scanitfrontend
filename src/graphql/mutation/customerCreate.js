import { gql } from "graphql-request";

const customerCreate = () => {
  return gql`
    mutation CreateUserMutation($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  `;
};

export default customerCreate;
