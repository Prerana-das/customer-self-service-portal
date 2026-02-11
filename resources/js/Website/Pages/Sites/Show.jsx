import { useEffect, useState } from "react";
import { request } from "../../Request";
import AuthenticateLayout from "../../Layouts/AuthenticateLayout";

export default function Show({ id }) {
    const [siteData, setSiteData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteData = async () => {
        setLoading(true);
        const data = await request.get(`api/sites/${id}/overview`);
        if (data) setSiteData(data);
            setLoading(false);
        };

        fetchSiteData();
    }, [id]);

    if (loading)
        return (
        <div className="flex justify-center items-center h-screen text-blue-600">
            Loading...
        </div>
        );

    if (!siteData)
        return (
        <div className="flex justify-center items-center h-screen text-red-500">
            No data found for this site.
        </div>
        );

    const { site, meters, consumption } = siteData;

    function formatDateTime(datetime) {
        if (!datetime) return "-";
        return new Date(datetime).toLocaleString("en-GB");
    }

    return (
        <AuthenticateLayout>
            <div className="min-h-screen bg-sky-50 p-4 sm:p-6 lg:p-12">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
                    {site.name}
                </h3>

                {/* Meters */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Meters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {meters.map((meter) => (
                    <div
                        key={meter.id}
                        className="bg-white rounded-2xl shadow p-4 flex flex-col justify-center items-center text-center"
                    >
                        <h3 className="text-gray-500 text-sm">Meter ID</h3>
                        <p className="text-lg font-bold text-blue-600">{meter.meter_id}</p>

                        <h3 className="text-gray-500 text-sm mt-2">Type</h3>
                        <p className="text-md font-medium text-gray-700">{meter.type}</p>

                        <h3 className="text-gray-500 text-sm mt-2">Latest Reading</h3>
                        <p className="text-md font-medium text-blue-600">{meter.latest_reading}</p>

                        <h3 className="text-gray-500 text-sm mt-2">Last Updated</h3>
                        <p className="text-md text-gray-500">{formatDateTime(meter.last_updated)}</p>
                    </div>
                    ))}
                </div>

                {/* Consumption */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Consumption (Last 6 Months)</h2>
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 text-gray-500">Month</th>
                            <th className="px-4 py-2 text-gray-500">Usage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {consumption.map((c, index) => (
                            <tr key={index} className="border-t">
                            <td className="px-4 py-2">{c.month}</td>
                            <td className="px-4 py-2 font-medium text-blue-600">{c.usage}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </AuthenticateLayout>
    );
}
