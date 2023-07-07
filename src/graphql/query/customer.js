import { gql } from "graphql-request";

const customerQuery = (customerAccessToken) => {
  const queryArguments = `customerAccessToken: "${customerAccessToken}"`;

  return gql`
  query {
      allProducts {
        id
        name
        vendor {
          id
        }
        image
        productSlug
        description
        SubCategory {
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

export default customerQuery;
