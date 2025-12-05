"use client";

import React, { useState, useMemo, useCallback } from "react";
import Header from "@/Components/Header";
import Table from "@/Components/Resuable-Tables/Table";
import SearchTextInput from "@/Components/TextField/SearchTextInput";
import { BadgePlus } from "lucide-react";
import { useRouter } from "next/navigation";

// Strongly typed user data
interface User {
  id: number;
  user: string;
  role: string;
  type: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const router = useRouter();

  // State for search input
  const [search, setSearch] = useState<string>("");

  // Mock data (replace with API call)
  const [data, setData] = useState<User[]>([
    { id: 1, user: "John Doe", role: "Admin", type: "Wedding", createdAt: "2024-01-15" },
    { id: 2, user: "Jane Smith", role: "Editor", type: "Corporate", createdAt: "2024-02-20" },
  ]);

  // Columns definition with proper type
  const columns: Array<{ header: string; accessor: keyof User }> = useMemo(
    () => [
      { header: "User", accessor: "user" },
      { header: "Role", accessor: "role" },
      { header: "Event Type", accessor: "type" },
      { header: "Created At", accessor: "createdAt" },
    ],
    []
  );

  // Edit callback
  const handleEdit = useCallback((row: User) => {
    console.log("Edit clicked for:", row);
    alert(`Edit ${row.user}`);
  }, []);

  // Delete callback
  const handleDelete = useCallback((row: User) => {
    if (confirm(`Are you sure you want to delete ${row.user}?`)) {
      setData((prev) => prev.filter((item) => item.id !== row.id));
    }
  }, []);

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    if (!search) return data;
    const query = search.toLowerCase();
    return data.filter(
      (item) =>
        item.user.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }, [data, search]);

  return (
    <div className="md:px-8 pb-8 p-1 space-y-4">
      {/* Page Header */}
      <Header
        headerTitle="User Management"
        headerDescription="Manage all users and roles in the system"
        actions={
          <button
            className="bg-[#137fec] py-2 px-3 rounded-sm text-white flex items-center cursor-pointer"
            onClick={() => router.push("/routes/admin/create-user")}
          >
            <BadgePlus className="inline w-4 h-4 mr-1" />
            <span>Add New User</span>
          </button>
        }
      />

      {/* Search Input */}
      <SearchTextInput
        name="search"
        placeholder="Search users by name, role or event type..."
        type="text"
        value={search}
        setValue={setSearch}
      />

      {/* Users Table */}
      <Table<User>
        columns={columns}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="id"
      />
    </div>
  );
};

export default Users;
