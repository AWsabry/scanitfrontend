import {gql} from "graphql-request";

const blogsQuery = (limit = 3) => {
    const queryArguments = `first: ${limit}`;

    return gql`
        {
            
                allUsers{
                  id
                  email 
                  # add any other fields you want to retrieve
                }
             
        }
    `
}

export default blogsQuery;