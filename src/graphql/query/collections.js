import {gql} from "graphql-request";

const collectionsQuery = (limit = 10) => {
    const queryArguments = `first: ${limit}`;

    return gql`
    query {
        allProducts {
          id
          name
          ArabicName
          vendor {
            id
          }
          image
          productSlug
          description
          price
          category {
            id
          }
          active
          MostPopular
          NewProducts
          BestOffer
          created
        }
      }
    `
}

export default collectionsQuery;