import { Link } from "@inertiajs/react";


const GuestLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-b from-sky-100 to-sky-200">
            <div>
                <Link href="/">
                    {/* <img className="max-w-[180px] mx-auto" src={logoImage} alt="Logo" /> */}
                    {/* Logo */}
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-6 bg-white shadow-lg rounded-xl">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;
