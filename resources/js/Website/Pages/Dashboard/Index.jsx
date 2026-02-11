import { useEffect, useState } from "react";
import { request } from "../../Request";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [sites, setSites] = useState([]);
    const [activeSiteId, setActiveSiteId] = useState(null);
    const [stats, setStats] = useState({
        sitesCount: 0,
        activeMeters: 0,
        lastBill: 0,
        outstanding: 0,
    });

    // Fetch data
    const fetchData = async (siteId = null) => {
        const query = siteId ? `api/user?site_id=${siteId}` : "api/user";

        const me = await request.get(query);

        if (!me) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }

        setUser(me.user);
        setCustomer(me.customer);
        setSites(me.sites || []);
        setActiveSiteId(me.active_site_id);
        setStats(me.stats);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Switch Site
    const switchSite = (siteId) => {
        fetchData(siteId);
    };

    const logout = async () => {
        await request.post("api/logout");
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (!user)
        return (
            <div className="flex justify-center items-center h-screen text-blue-600 text-lg">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen bg-sky-50 p-4 sm:p-6 lg:p-12">
            <Head title="Dashboard" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-3 sm:mb-0">
                    Welcome, {user.name}
                </h1>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <select
                        value={activeSiteId || ""}
                        onChange={(e) => switchSite(e.target.value)}
                        className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-400 w-full sm:w-auto"
                    >
                        {sites.map((site) => (
                            <option key={site.id} value={site.id}>
                                {site.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Customer */}
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <h2 className="text-gray-500">Customer</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">
                        {customer?.name}
                    </p>
                </div>

                {/* Sites Count */}
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <h2 className="text-gray-500">Sites</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">
                        {stats.sitesCount}
                    </p>
                </div>

                {/* Active Meters */}
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <h2 className="text-gray-500">Active Meters</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">
                        {stats.activeMeters}
                    </p>
                </div>

                {/* Billing */}
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <h2 className="text-gray-500">Last Bill</h2>
                    <p className="text-xl font-bold text-blue-600 mt-2">
                        ${stats.lastBill}
                    </p>

                    <h2 className="text-gray-500 mt-4">Outstanding</h2>
                    <p className="text-xl font-bold text-red-500 mt-1">
                        ${stats.outstanding}
                    </p>
                </div>
            </div>
        </div>
    );
}
