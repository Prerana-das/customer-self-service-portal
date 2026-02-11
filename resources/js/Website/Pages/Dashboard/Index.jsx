import { useEffect, useState } from "react";
import { request } from "../../Request/index";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        sites: 0,
        activeMeters: 0,
        lastBill: 0,
        outstanding: 0,
    });

    useEffect(() => {
        // Check login and fetch stats
        const fetchData = async () => {
            const me = await request.get("api/me");
            console.log("User data:", me);
            if (!me) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }
            setUser(me);

            // Mock data
            setStats({
                sites: me?.stats?.sites || 0,
                activeMeters: me?.stats?.activeMeters || 0,
                lastBill: me?.stats?.lastBill || 0,
                outstanding: me?.stats?.outstanding || 0,
            });
        };
        fetchData();
    }, []);

    const logout = async () => {
        await request.post("api/logout");
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (!user) return <div className="flex justify-center items-center h-screen text-blue-600">Loading...</div>;

    return (
        <div className="min-h-screen bg-sky-50 p-4 sm:p-6 lg:p-12">
            <Head title="Dashboard" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Welcome, {user?.user?.name}</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Customer Name */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-medium text-gray-700">Customer</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">{user.customer.name}</p>
                </div>

                {/* Number of Sites */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-medium text-gray-700">Sites</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">{stats.sites}</p>
                </div>

                {/* Active Meters */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-medium text-gray-700">Active Meters</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">{stats.activeMeters}</p>
                </div>

                {/* Billing Info */}
                <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-medium text-gray-700">Last Bill</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">${stats.lastBill}</p>
                    <h2 className="text-lg font-medium text-gray-700 mt-2">Outstanding</h2>
                    <p className="text-xl font-bold text-blue-600 mt-1">${stats.outstanding}</p>
                </div>
            </div>

            {/* Optional: Add charts or monthly usage later */}
        </div>
    );
}
