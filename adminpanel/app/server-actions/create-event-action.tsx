// /app/server-actions/create-event-action.ts
"use server";

import { AdminCreateEventService } from "@/services/create-event-service";
import { AdminCreateEventResponse } from "@/types/types";

/**
 * Server Action for creating event
 * Receives:
 *   - payload: plain JSON event object
 *   - token: auth token from client
 */
export async function adminCreateEventAction(
    payload: any,
    token?: any,
): Promise<AdminCreateEventResponse> {


    

    try {
        // Directly call the service with clean JSON payload
        const createdEvent = await AdminCreateEventService(payload, token);

        return {
            success: true,
            error: null,
            event: createdEvent,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error?.message || "Failed to create event",
            event: null,
        };
    }
}
