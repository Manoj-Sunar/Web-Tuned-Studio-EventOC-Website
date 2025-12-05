// /app/server-actions/create-event-action.ts
"use server";

import { AdminEditEventService } from "@/services/admin-edit-event-service";
import { AdminCreateEventResponse } from "@/types/types";


/**
 * Server Action for creating event
 * Receives:
 *   - payload: plain JSON event object
 *   - token: auth token from client
 */
export async function adminEditEventAction(
    id:string,
    payload: any,
    token?:string,
): Promise<AdminCreateEventResponse> {




    try {
        // Directly call the service with clean JSON payload
        const editedEvent = await AdminEditEventService(id,payload, token);

        return {
            success: true,
            error: null,
            event: editedEvent,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error?.message || "Failed to edit event",
            event: null,
        };
    }
}
