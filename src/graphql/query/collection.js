import { gql } from "graphql-request";

const collectionQuery = (slug) => {
  return gql`
  query {
      getProductsByCategory(categorySlug: "${slug}") {
        id
        name
        vendor {
          id
        }
        productSlug
        description
        image
        price
        file
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
