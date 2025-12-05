"use client";

import Header from "@/Components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { memo, useMemo } from "react";

// -------------------- Reusable Components --------------------
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
}

const StatCard: React.FC<StatCardProps> = memo(({ title, value, change }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <p className="text-gray-700">{title}</p>
    <h2 className="text-3xl font-bold text-gray-700">{value}</h2>
    {change && <span className="text-green-400">{change}</span>}
  </div>
));

StatCard.displayName = "StatCard";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = memo(({ title, children, className }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-200 ${className}`}>
    <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
));

ChartCard.displayName = "ChartCard";



// -------------------- Dashboard Page --------------------
export default function DashboardPage() {
  // ---------- Memoized Sample Data ----------
  const lineData = useMemo(
    () => [
      { month: "Jan", revenue: 4000 },
      { month: "Feb", revenue: 3000 },
      { month: "Mar", revenue: 5000 },
      { month: "Apr", revenue: 4500 },
      { month: "May", revenue: 6000 },
      { month: "Jun", revenue: 7000 },
    ],
    []
  );

  const barData = useMemo(
    () => [
      { name: "Music", events: 12 },
      { name: "Tech", events: 18 },
      { name: "Sports", events: 8 },
      { name: "Business", events: 15 },
    ],
    []
  );

  const pieData = useMemo(
    () => [
      { name: "Completed", value: 62 },
      { name: "In Progress", value: 26 },
      { name: "Cancelled", value: 12 },
    ],
    []
  );

  const pieColors = useMemo(() => ["#4CAF50", "#2196F3", "#FF5722"], []);

  const topStats = useMemo(
    () => [
      { title: "Total Revenue", value: "$125,670", change: "+12.5%" },
      { title: "Total Users", value: "9,452", change: "+8%" },
      { title: "Total Events", value: "128", change: "+5%" },
    ],
    []
  );

  const headerActions = useMemo(
    () => ["Last 30 Days", "This Quarter", "Custom Range"],
    []
  );

  return (
    <div className="md:px-8 pb-8 px-3">
      {/* HEADER */}
      <Header
        headerTitle="Dashboard"
        headerDescription="Manage your platform data and settings."
        actions={
          <>
            {headerActions.map((label) => (
              <button
                key={label}
                className="px-2 py-[6px] text-white text-xs bg-gray-500 hover:bg-gray-600 rounded-sm"
              >
                {label}
              </button>
            ))}
          </>
        }
      />

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LINE CHART */}
        <ChartCard title="Revenue Growth" className="col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* PIE CHART */}
        <ChartCard title="Event Status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* BAR CHART */}
      <ChartCard title="Events Category" className="mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip />
            <Bar dataKey="events" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
