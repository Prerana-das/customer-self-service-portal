import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { request } from "../Request";

const AuthenticateLayout = ({ children, title = "Dashboard"
 }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const me = await request.get('api/user');
      console.log('AuthenticatedLayout - User Data:', me); // Debugging log

      if (!me) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
      }
      setUser(me.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await request.post("api/logout");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-sky-50">
      <Head/>

      {/* Header */}

      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
            <a
                href={`/`}
                className="block bg-gray-50 hover:bg-blue-50 p-3 rounded-lg transition text-blue-600 font-medium"
            >
                Energylogix
            </a>
          
        </h1>
        <nav className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/billing"
            className="text-blue-600 hover:underline"
          >
            Billing and Contact
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-12">{children}</main>
    </div>
  );
}

export default AuthenticateLayout;
