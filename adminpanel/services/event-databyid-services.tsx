import { fetchGraphQL } from "@/graphqlclient/graphql-client";
import { EventPortfolio } from "@/types/types";

export async function getEventByIdServices(id: string,token:any): Promise<EventPortfolio> {

    console.log(`id is this : ${id}`)

    const query = `
      query GetEventById($id: ID!) {
        getEventPortfolioById(id: $id) {
          id
          title
          shortSummary
          fullDescription
          coverImageUrl
          slug
          location
          date
          eventType
          galleryImages
          reviewText
        }
      }
    `;

    const response = await fetchGraphQL<{
        getEventPortfolioById: EventPortfolio;
    }>({
        query,
        variables: { id },
        token,
    });

    return response.getEventPortfolioById;
}
