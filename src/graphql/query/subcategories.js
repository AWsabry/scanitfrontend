import {gql} from "graphql-request";

const subcategoriesQuery = (categorySlug) => {
    return gql`
    query {
        getSubcategoriesByCategory(categorySlug: "${categorySlug}") {
          id
          SubCategoryName
          subCategorySlug
          category{
            id
            CategoryName
            categorySlug
            image
            active
            created
          }
          active
          created
          image
        
        }  
      }
    `;
};

export default subcategoriesQuery;
