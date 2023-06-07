import {gql} from "graphql-request";

const customerAccessTokenCreate = () => {
    return gql`
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            createToken(input: $input) {
                token {
                    token
                    expires
                }
            }
        }
    `
}

export default customerAccessTokenCreate;