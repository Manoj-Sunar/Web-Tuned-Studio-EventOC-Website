// /services/create-event-service.ts
import { fetchGraphQL } from "@/graphqlclient/graphql-client";
import { EventForm } from "@/types/types";

/**
 * AdminEditEventService
 * Updates an existing portfolio/event using GraphQL mutation.
 */
export async function AdminEditEventService(
    id: string,
    event: EventForm,
    token?: string
) {
    const mutation = `
    mutation UpdatePortfolio($id: ID!, $input: UpdatePortfolioInput!) {
      updatePortfolio(id: $id, input: $input) {
        id
        title
        slug
        date
        eventType
        location
        shortSummary
        fullDescription
        coverImageUrl
        galleryImages
        reviewText
        isFeatured
      }
    }
  `;

    const variables = {
        id,
        input: {
            title: event.title,
            slug: event.slug,
            date: event.date,
            eventType: event.eventType,
            location: event.location,
            shortSummary: event.shortSummary || "",
            fullDescription: event.fullDescription || "",
            coverImageUrl: event.coverImageUrl,
            galleryImages: event.galleryImages || [],
            reviewText: event.reviewText || "",
            isFeatured: event.isFeatured ?? false,
        },
    };

    const data = await fetchGraphQL<{ updatePortfolio: any }>({
        query: mutation,
        variables,
        token: token || undefined,
    });

    return data.updatePortfolio;
}
