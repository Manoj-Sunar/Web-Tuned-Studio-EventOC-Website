// /services/create-event-service.ts
import { fetchGraphQL } from "@/graphqlclient/graphql-client";
import { EventForm, GraphQLAdminCreateEventResponse } from "@/types/types";

/**
 * AdminCreateEventService
 * Sends a GraphQL mutation to create a portfolio/event.
 *
 * @param event Input object (EventForm) with fields matching your GraphQL input type.
 * @returns GraphQLAdminCreateEventResponse (created event object)
 */
export async function AdminCreateEventService(event: EventForm, token?: string) {

    console.log(event);
    // Validate required fields
    if (!event.coverImageUrl || !event.coverImageUrl.trim()) {
        throw new Error("Cover image URL is required");
    }

    const mutation = `
    mutation CreatePortfolio($input: CreatePortfolioInput!) {
      createPortfolio(input: $input) {
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
        createdAt
        updatedAt
      }
    }
  `;

    const variables = {
        input: {
            title: event.title,
            slug: event.slug,
            date: event.date,
            eventType: event.eventType,
            location: event.location,
            shortSummary: event.shortSummary || "",
            fullDescription: event.fullDescription || "",
            coverImageUrl: event.coverImageUrl,       // always include!
            galleryImages: event.galleryImages || [],
            reviewText: event.reviewText || "",
            isFeatured: event.isFeatured || false,
        },
    };

    const data = await fetchGraphQL<{ createPortfolio: any }>({
        query: mutation,
        variables,
        token: token || undefined,
    });

    return data.createPortfolio;
}
