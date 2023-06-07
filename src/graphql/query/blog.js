import {gql} from "graphql-request";

const blogQuery = ({slug}) => {
    const queryArguments = `handle: "${slug}"`;

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

export default blogQuery;