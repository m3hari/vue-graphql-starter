import gql from "graphql-tag";

export const TODOS = gql`
  subscription {
    todos(order_by: { created_at: desc }) {
      id
      content
      owner {
        name
      }
    }
  }
`;
