import { Head } from "@inertiajs/react";
import { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { request } from "../../Request/index";
import commonToast from '../../Utilities/CommonToast';
import { useEffect } from "react";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        processing: false,
    });

    const submit = async (e) => {
        e.preventDefault();
        setForm({ ...form, processing: true });

        const response = await request.post("api/register", {
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
        });
        

        setForm({ ...form, processing: false });

        if (response && response.token) {
            localStorage.setItem("token", response.token);
            commonToast.success('You are successfully registered');
            window.location.href = "/";
        }
    };

     // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) window.location.href = "/";
    }, []);

    return (
        <GuestLayout>
            <Head title="Register" />

            <h1 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
                Create Account
            </h1>

            <form onSubmit={submit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />


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
            

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    value={form.password_confirmation}
                    onChange={(e) =>
                        setForm({ ...form, password_confirmation: e.target.value })
                    }
                    required
                />


                <button
                    type="submit"
                    disabled={form.processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition mt-2"
                >
                    {form.processing ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-sky-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </GuestLayout>
    );
}
