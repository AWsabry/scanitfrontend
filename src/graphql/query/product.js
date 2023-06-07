import {gql} from "graphql-request";

const productQuery = (id) => {
    //const queryArguments = `id: "${slug}"`;
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
}

export default productQuery;