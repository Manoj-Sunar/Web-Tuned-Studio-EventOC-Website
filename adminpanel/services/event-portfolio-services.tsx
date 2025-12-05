import { fetchGraphQL } from "@/graphqlclient/graphql-client";
import { EventPortfolio } from "@/types/types";

export async function getAllPortfolio(): Promise<EventPortfolio[]> {
  const query = `
    query getAllPortfolio {
      getAllPortfolio {
        id
        title
        slug
        date
        eventType
        location
        coverImageUrl
        galleryImages
        createdAt
        updatedAt
      }
    }
  `;

  const data = await fetchGraphQL<{ getAllPortfolio: EventPortfolio[] }>({
    query,
  });

  return data.getAllPortfolio;
}
