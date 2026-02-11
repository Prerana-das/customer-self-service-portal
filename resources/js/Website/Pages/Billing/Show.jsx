import { useEffect, useState } from "react";
import { request } from "../../Request";
import AuthenticateLayout from "../../Layouts/AuthenticateLayout";
import { Head } from "@inertiajs/react";

export default function BillingPreferences() {
    const [preferences, setPreferences] = useState({
        format: "PDF", // default
        email: "",
        phone: "",
    });
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchPreferences = async () => {
            const data = await request.get("api/billing-preferences");
        };
        // fetchPreferences();
    }, []);

    const handleChange = (field, value) => {
        setPreferences({ ...preferences, [field]: value });
    };

    const savePreferences = async () => {
        setProcessing(true);
        const response = await request.post("api/billing-preferences", preferences);
        if (response) {
            alert("Preferences saved successfully!");
            setProcessing(false);
        }
    };

    const updateContactDetails = async () => {
        setProcessing(true);
        const response = await request.post("api/update-contact", preferences);
        if (response) {
            alert("Contact details updated successfully!");
            setProcessing(false);
        }
    };

    return (
        <AuthenticateLayout>
            <Head title="Billing & Preferences" />

            <div className="min-h-screen bg-sky-50 p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
                    Billing Preferences
                </h1>

                {/* Billing Format */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-gray-700 font-medium mb-2">Billing Format</h2>
                    <select
                        value={preferences.format}
                        onChange={(e) => handleChange("format", e.target.value)}
                        className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                    >
                        <option value="PDF">PDF</option>
                        <option value="CSV">CSV</option>
                        <option value="EDI">EDI</option>
                    </select>
                </div>

                {/* Save Button */}
                <button
                    onClick={savePreferences}
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    {processing ? "Saving..." : "Save Preferences"}
                </button>

                {/* Contact Details */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-gray-700 font-medium mb-4">Contact Details</h2>

                    <div className="mb-4">
                        <label className="block text-gray-500 mb-1">Email</label>
                        <input
                            type="email"
                            value={preferences.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 mb-1">Phone</label>
                        <input
                            type="text"
                            value={preferences.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={savePreferences}
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    {processing ? "Saving..." : "Save Contact Details"}
                </button>

                
            </div>
        </AuthenticateLayout>
    );
}
