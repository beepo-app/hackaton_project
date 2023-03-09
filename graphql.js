import { gql, GraphQLClient } from "graphql-request";

export const GQLClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT,
  {
    headers: {
      authorization: "Bearer MY_TOKEN",
      "X-API-KEY": import.meta.env.VITE_CYBERCONNECT_API_KEY,
    },
  }
);

export const mutations = {
  loginGetMessage: gql`
    mutation loginGetMessage($domain: String!, $address: AddressEVM!) {
      loginGetMessage(input: { domain: $domain, address: $address }) {
        message
      }
    }
  `,

  loginVerify: gql`
    mutation loginVerify(
      $domain: String!
      $address: AddressEVM!
      $signature: String!
    ) {
      loginVerify(
        input: { domain: $domain, address: $address, signature: $signature }
      ) {
        accessToken
      }
    }
  `,
};
