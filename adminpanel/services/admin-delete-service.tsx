import { fetchGraphQL } from "@/graphqlclient/graphql-client";

/**
 * Call GraphQL mutation to delete an event/portfolio
 */
export async function AdminEventDeleteService(eventId: string, token: string) {
    const mutation = `
    mutation DeletePortfolio($id: ID!) {
      deletePortfolio(id: $id)
    }
  `;

    const variables = { id: eventId };

    const data = await fetchGraphQL<{ deletePortfolio: boolean }>({
        query: mutation,
        variables,
        token, // pass auth token if needed
    });

    // The mutation usually returns true/false
    return data.deletePortfolio;
}
