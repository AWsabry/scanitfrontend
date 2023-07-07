import { gql } from "graphql-request";

const collectionQuery = (slug) => {
  return gql`
  query {
    getProductsByCategory(subCategorySlug:"${slug}") {
       id
        name
        vendor {
          id
        }
        productSlug
        description
        image
        file
        startFrom
        reachTo
        SubCategory {
          id
          SubCategoryName
          subCategorySlug
          image
          active
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
