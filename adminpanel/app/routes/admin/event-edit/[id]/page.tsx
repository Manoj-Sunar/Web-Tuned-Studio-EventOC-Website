import { cookies } from "next/headers";
import { getEventByIdServices } from "@/services/event-databyid-services";
import NewEventForm from "../../create-event/event-client";

interface EditEventProps {
    params: { id: string };
}

const EditEvent = async ({ params }: EditEventProps) => {
    const { id } = await params;

    // 🔹 Get token from HTTP-only cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value ?? null;
  
    let editedData = null;
    try {
        // Pass token to your service if required
        editedData = await getEventByIdServices(id, token);
        
    } catch (error) {
        console.error("Error fetching event:", error);
        return (
            <div className="p-6 text-red-600">
                Failed to load event data. Please try again later.
            </div>
        );
    }

    if (!editedData) {
        return (
            <div className="p-6 text-gray-500">
                Event not found.
            </div>
        );
    }

    return (
        <NewEventForm
            heading="Update Event Portfolio"
            id={id}
            button="Save Event"
            editedData={editedData}
        />
    );
};

export default EditEvent;
