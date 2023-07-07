import {gql} from "graphql-request";

const collectionsQuery = (limit = 10) => {
    const queryArguments = `first: ${limit}`;

    return gql`
    query {
        allCategories {
          id
          CategoryName
          image
          categorySlug
          active
          created
        }
      }
    `
}

export default collectionsQuery;