import {gql} from "graphql-request";

const productQuery = (id) => {
    //const queryArguments = `id: "${slug}"`;
    return gql`
    query {
        getProduct(id: "${id}") {
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
          }
          active
          MostPopular
          NewProducts
          BestOffer
          created
        }
      }
    `;
}

export default productQuery;