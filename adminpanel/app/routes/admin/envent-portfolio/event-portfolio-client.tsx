"use client";

import { BadgePlus } from "lucide-react";
import Header from "@/Components/Header";
import Table from "@/Components/Resuable-Tables/Table";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchTextInput from "@/Components/TextField/SearchTextInput";
import { Column, EventPortfolio, EventType } from "@/types/types";
import { adminDeleteAction } from "@/app/server-actions/event-delete-action";



interface Props {
    portfolios: EventPortfolio[];
}



const EventPortfolioClient = ({ portfolios }: Props) => {

    const router = useRouter();
    const [loadingRows, setLoadingRows] = useState<Record<string, boolean>>({});


    // 🔥 Convert API type → frontend UI table type
    const [data, setData] = useState<EventType[]>(
        portfolios.map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            eventType: p.eventType,
            date: p.date,
            location: p.location,
            coverImageUrl: p.coverImageUrl,
            galleryImages: p.galleryImages,
        }))
    );

    const [search, setSearch] = useState("");

    // 🔥 Proper columns matching EventType
    const columns: Column<EventType>[] = useMemo(
        () => [
            { header: "Cover", accessor: "coverImageUrl" },
            { header: "Title", accessor: "title" },
            { header: "Event Type", accessor: "eventType" },
            { header: "Date", accessor: "date" },
            { header: "Location", accessor: "location" },
        ],
        []
    );

    // 🔥 Search filtering
    const filteredData = useMemo(() => {
        if (!search.trim()) return data;
        const s = search.toLowerCase();
        return data.filter(
            (item) =>
                item.title.toLowerCase().includes(s) ||
                item.eventType.toLowerCase().includes(s)
        );
    }, [search, data]);



    const handleEdit = useCallback((id: any) => {
        router.push(`/routes/admin/event-edit/${id}`)
    }, []);




    const handleDelete = useCallback(async (id: any) => {
        const token = localStorage.getItem("token") || "";
        try {
            setLoadingRows((prev) => ({ ...prev, [id]: true }));
            const result = await adminDeleteAction(id, token);
            if (result.success) {
                setLoadingRows((prev) => ({ ...prev, [id]: false }));
                setData((prev) => prev.filter((item) => item.id !== id));
            }
        } catch (error) {

        } finally {
            setLoadingRows((prev) => ({ ...prev, [id]: false }));
        }
    }, [data]);




    return (
        <div className="md:px-8 pb-8 p-1">
            <Header
                headerTitle="Event Management"
                headerDescription="Manage all events in the system"
                actions={
                    <button
                        className="bg-[#137fec] py-2 px-3 rounded-sm text-white flex items-center"
                        onClick={() => router.push("/routes/admin/create-event")}
                    >
                        <BadgePlus className="inline w-4 h-4 mr-1" />
                        <span>Add New Event</span>
                    </button>
                }
            />

            <div className="my-4">
                <SearchTextInput
                    name="search"
                    placeholder="Search events..."
                    type="text"
                    value={search}
                    setValue={setSearch}
                />
            </div>

            <Table<EventType>
                columns={columns}
                data={filteredData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                rowKey="id"
                loading={loadingRows}
            />
        </div>
    );
};

export default EventPortfolioClient;
