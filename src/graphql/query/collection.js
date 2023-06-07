import { gql } from "graphql-request";

const collectionQuery = (handle, sortKey, reverse, limit = 100) => {
  const queryArguments = `handle: "${handle}"`;
  let queryProductArguments = `first: ${limit}`;

  if (sortKey) {
    queryProductArguments = `first: ${limit}, sortKey: ${sortKey}, reverse: ${reverse}`;
  }

  return gql`
  query {
      getProduct(id: "${id}") {
        id
        name
        ArabicName
        vendor {
          id
        }
        productSlug
        description
        image
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
  `;
};

export default collectionQuery;
