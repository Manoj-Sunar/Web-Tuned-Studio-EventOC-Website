"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Header from "@/Components/Header";
import InputTextField from "@/Components/TextField/InputTextField";
import SelectField from "@/Components/TextField/SelectField";
import TextAreaField from "@/Components/TextField/TextArea";
import { BadgePlus, Trash2 } from "lucide-react";
import { CoreField, EventForm } from "@/types/types";
import { useRouter } from "next/navigation";
import { adminCreateEventAction } from "@/app/server-actions/create-event-action";
import Loader from "@/Components/Loader";
import { adminEditEventAction } from "@/app/server-actions/edit-event-action";

interface eventProps {
    heading: string,
    id?: string,
    button?: string,
    editedData?: any,
}
const NewEventForm: React.FC<eventProps> = ({ heading, id, button, editedData }) => {
    const [form, setForm] = useState<EventForm>({
        title: "",
        slug: "",
        eventType: "Birthday",
        date: "",
        location: "",
        shortSummary: "",
        fullDescription: "",
        coverImageUrl: "",
        galleryImages: [],
        reviewText: "",
        isFeatured: false,
    });

    console.log(editedData)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const coreFields: CoreField<keyof EventForm>[] = useMemo(
        () => [
            { label: "Event Title", name: "title", type: "text", placeholder: "Event Title" },
            { label: "URL Slug", name: "slug", type: "text", placeholder: "annual-event-2025" },
            {
                label: "Event Type",
                name: "eventType",
                type: "select",
                options: [
                    "Birthday",
                    "Beach & Pool",
                    "Brand Launch",
                    "Music Night",
                    "Custom",
                    "Wedding",
                    "Corporate",
                    "Festival",
                    "Other",
                ],
            },
            { label: "Date", name: "date", type: "date" },
            { label: "Location", name: "location", type: "text", placeholder: "San Francisco, CA" },
        ],
        []
    );

    const handleChange = useCallback(
        <K extends keyof EventForm>(field: K, value: EventForm[K]) =>
            setForm((prev) => ({ ...prev, [field]: value })),
        []
    );

    const addGalleryImage = () => {
        handleChange("galleryImages", [...form.galleryImages, ""]);
    };

    const updateGalleryImage = (index: number, value: string) => {
        const updated = [...form.galleryImages];
        updated[index] = value;
        handleChange("galleryImages", updated);
    };

    const removeGalleryImage = (index: number) => {
        handleChange("galleryImages", form.galleryImages.filter((_, i) => i !== index));
    };


    const CreateNewEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");

            const payload = {
                title: form.title,
                slug: form.slug,
                eventType: form.eventType,
                date: form.date,
                location: form.location,
                shortSummary: form.shortSummary,
                fullDescription: form.fullDescription,
                coverImageUrl: form.coverImageUrl,
                galleryImages: form.galleryImages,
                reviewText: form.reviewText,
                isFeatured: form.isFeatured,
            };


            const result = await adminCreateEventAction(payload, token);

            if (result.success) {
                router.push("/routes/admin/envent-portfolio");
            } else {
                setError(result.error);
            }
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const editEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token") ?? null;

            const payload = {
                title: form.title,
                slug: form.slug,
                eventType: form.eventType,
                date: form.date,
                location: form.location,
                shortSummary: form.shortSummary,
                fullDescription: form.fullDescription,
                coverImageUrl: form.coverImageUrl,
                galleryImages: form.galleryImages,
                reviewText: form.reviewText,
                isFeatured: form.isFeatured,
            };

            if (!id) {
                setError("Missing event ID");
                return;
            }

            const result = await adminEditEventAction(id, payload, token || "");

            if (result.success) {
                router.push("/routes/admin/envent-portfolio");
            } else {
                setError(result.error);
            }
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }


    const handleSave = useCallback(async () => {
        if (id) {
            editEvent();
        } else {
            CreateNewEvent();
        }
    }, [form]);





    // Fill form with edited data if available
    useEffect(() => {
        if (editedData) {
            setForm({
                title: editedData.title || "",
                slug: editedData.slug || "",
                eventType: editedData.eventType || "Birthday",
                date: editedData.date || "",
                location: editedData.location || "",
                shortSummary: editedData.shortSummary || "",
                fullDescription: editedData.fullDescription || "",
                coverImageUrl: editedData.coverImageUrl || "",
                galleryImages: editedData.galleryImages || [],
                reviewText: editedData.reviewText || "",
                isFeatured: editedData.isFeatured || false,
            });
        }
    }, [editedData]);


    return (
        <div className="p-3 md:p-8 space-y-6">
            <Header headerTitle={heading} />

            <div className="bg-white border border-gray-200 rounded-lg shadow-xs divide-y divide-gray-300">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coreFields.map((field) => (
                        <div
                            key={field.name}
                            className={`flex flex-col gap-y-2 ${field.name === "location" ? "md:col-span-2" : ""}`}
                        >
                            <label>{field.label}</label>

                            {field.type === "select" ? (
                                <SelectField
                                    name={field.name}
                                    options={field.options || []}
                                    value={form[field.name] as string}
                                    setValue={(val) => handleChange(field.name, val as any)}
                                />
                            ) : (
                                <InputTextField
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    InputValue={form[field.name] as string}
                                    setValue={(val) => handleChange(field.name, val as any)}
                                    error={error}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-6 space-y-6">
                    <h3 className="font-bold text-xl text-gray-700">Content & Description</h3>

                    <TextAreaField
                        name="shortSummary"
                        value={form.shortSummary}
                        setValue={(val) => handleChange("shortSummary", val)}
                        placeholder="Short Summary"
                    />

                    <TextAreaField
                        name="fullDescription"
                        value={form.fullDescription}
                        setValue={(val) => handleChange("fullDescription", val)}
                        placeholder="Full Description"
                    />
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label>Cover Image</label>
                        <InputTextField
                            name="coverImage"
                            type="text"
                            placeholder="Cover Image URL"
                            InputValue={form.coverImageUrl}
                            setValue={(val) => handleChange("coverImageUrl", val)}
                            error={error}

                        />
                    </div>

                    <div>
                        <label>Gallery Images</label>

                        {form.galleryImages.map((img, index) => (
                            <div key={index} className="flex items-center gap-2 mt-2">
                                <InputTextField
                                    name={`gallery-${index}`}
                                    type="text"
                                    placeholder="Image URL"
                                    InputValue={img}
                                    setValue={(val) => updateGalleryImage(index, val)}
                                    error={error}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addGalleryImage}
                            className="flex items-center gap-2 mt-3 text-[#137fec] font-medium hover:text-[#0f6fd1]">
                            <BadgePlus /> Add Image
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <label>Review Text</label>
                    <TextAreaField
                        name="reviewText"
                        value={form.reviewText}
                        setValue={(val) => handleChange("reviewText", val)}
                        placeholder="Review Text"
                    />
                </div>

                <div className="p-6 bg-gray-50 flex justify-end">
                    <PrimaryButton
                        label={loading ? <Loader /> : button}
                        className="h-10"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewEventForm;
