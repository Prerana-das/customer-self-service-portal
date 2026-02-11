import { Head } from "@inertiajs/react";
import { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { request } from "../../Request";
import commonToast from '../../Utilities/CommonToast';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        processing: false,
    });

    const submit = async (e) => {
        e.preventDefault();
        setForm({ ...form, processing: true });

        const response = await request.requestJsonPost("api/login", {
            email: form.email,
            password: form.password,
        });

        setForm({ ...form, processing: false });

        if (response && response.token) {
            commonToast.success('You are successfully logged in');
            localStorage.setItem("token", response.token);
            window.location.href = "/";
        }

    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <h1 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
                Login
            </h1>

            <form onSubmit={submit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    disabled={form.processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition mt-2"
                >
                    {form.processing ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-sky-600 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </GuestLayout>
    );
}
