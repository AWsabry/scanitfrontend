import {GraphQLClient} from 'graphql-request';
const client = async (query,prefix) => {
    var endpoint = ''
    prefix? endpoint = `https://api.3dscanit.org/`+prefix : endpoint = `https://api.3dscanit.org/getProducts/`;
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await graphQLClient.request(query);
}
export default client;