"use server";

import { AdminEventDeleteService } from "@/services/admin-delete-service";

/**
 * Server Action to delete an event
 */
export async function adminDeleteAction(eventId: string, token: string) {
    try {
        const result = await AdminEventDeleteService(eventId, token);

        return {
            success: true,
            error: null,
            result,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error?.message || "Failed to delete event",
        };
    }
}
