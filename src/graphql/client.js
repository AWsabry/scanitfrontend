import {GraphQLClient} from 'graphql-request';

const client = async (query,prefix) => {
    var endpoint = ''
    prefix? endpoint = `http://api.3dscanit.org/`+prefix : endpoint = `http://api.3dscanit.org/getProducts/`;
    console.log(prefix, endpoint)
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return await graphQLClient.request(query);
}

export default client;