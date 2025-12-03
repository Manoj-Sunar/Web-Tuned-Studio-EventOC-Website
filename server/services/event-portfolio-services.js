
import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from "apollo-server-express";
import PortfolioEventSchema from "../models/portfolio-event-schema.js";



export const createPortfolioService = async (input, user) => {
    // ----------------------
    // Authentication
    // ----------------------
    if (!user) throw new Error("Authentication required");
    if (!user.isAdmin) throw new Error("Only admins can create events");

    // ----------------------
    // Validation
    // ----------------------
    const requiredFields = [
        "title",
        "slug",
        "date",
        "eventType",
        "location",
        "shortSummary",
        "fullDescription",
        "coverImageUrl",
    ];

    for (const field of requiredFields) {
        if (!input[field] || input[field].trim() === "") {
            throw new Error(`Field "${field}" is required`);
        }
    }

    // Ensure unique slug
    const existing = await PortfolioEventSchema.findOne({ slug: input.slug });
    if (existing) throw new Error("Slug already exists, choose another");

    // ----------------------
    // Create Portfolio Event
    // ----------------------
    const portfolio = await PortfolioEventSchema.create({
        ...input,
        galleryImages: input.galleryImages || [],
        reviewText: input.reviewText || "",
        isFeatured: input.isFeatured || false,
    });

    return portfolio;
}



export const deletePortfolioService = async (id, user) => {
    // ----------------------
    // Authentication
    // ----------------------
    if (!user) throw new Error("Authentication required");
    if (!user.isAdmin) throw new Error("Only admins can delete events");

    // ----------------------
    // Check if event exists
    // ----------------------
    const event = await PortfolioEventSchema.findById(id);
    if (!event) throw new Error("Portfolio event not found");

    // ----------------------
    // Delete event
    // ----------------------
    await PortfolioEventSchema.findByIdAndDelete(id);

    return "This event deleted successfully";
};


export const getPortfolioEventServiceById = async (id, user) => {
    try {

        if (!user) throw new Error("Authentication required");
        if (!user.isAdmin) throw new Error("Only admins can edit event portfolio");


        const event = await PortfolioEventSchema.findById(id);

        if (!event) throw new Error("Portfolio event not found");
        return event;

    } catch (error) {

    }
}





export const updatePortfolioService = async (id, input, user) => {

    // List of allowed fields to update
    const ALLOWED_FIELDS = [
        "title",
        "slug",
        "date",
        "eventType",
        "location",
        "shortSummary",
        "fullDescription",
        "coverImageUrl",
        "galleryImages",
        "reviewText",
        "isFeatured",
    ];


    // ----------------------
    // Authentication
    // ----------------------
    if (!user) throw new AuthenticationError("Authentication required");
    if (!user.isAdmin) throw new ForbiddenError("Only admins can update events");

    // ----------------------
    // Check if event exists
    // ----------------------
    const event = await PortfolioEventSchema.findById(id);
    if (!event) throw new UserInputError("Portfolio event not found");

    // ----------------------
    // If slug is being updated, ensure uniqueness
    // ----------------------
    if (input.slug && input.slug !== event.slug) {
        const existing = await PortfolioEventSchema.findOne({ slug: input.slug });
        if (existing) throw new UserInputError("Slug already exists, choose another");
    }

    // ----------------------
    // Filter only allowed fields
    // ----------------------
    const updateData = {};
    ALLOWED_FIELDS.forEach((field) => {
        if (input[field] !== undefined) {
            updateData[field] = input[field];
        }
    });

    // ----------------------
    // Update document atomically with validation
    // ----------------------
    const updatedEvent = await PortfolioEventSchema.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return updatedEvent;
};