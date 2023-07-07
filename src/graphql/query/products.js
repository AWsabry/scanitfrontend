import {gql} from "graphql-request";

const productsQuery = (limit = 200, sortKey, reverse, search) => {
    let queryArguments = `first: ${limit}`;

    if (sortKey) {
        queryArguments = `${queryArguments}, sortKey: ${sortKey}, reverse: ${reverse}`;
    }

    if (search) {
        queryArguments = `${queryArguments}, query: "title:${search.trim()}*"`;
    }

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
          file
          startFrom
          reachTo
          SubCategory {
            id
            SubCategoryName
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

export default productsQuery;
