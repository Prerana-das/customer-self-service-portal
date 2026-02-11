import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// -- popup notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./**/*.jsx")
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <ToastContainer />
                <App {...props} />
            </>
        );
    },
});
