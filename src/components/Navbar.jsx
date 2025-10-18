import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/home");
  };

  return (
    <>
      <div className="w-screen h-[8vh] bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 lg:px-8 flex items-center justify-between lg:justify-around shadow-sm relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50"></div>
        
        <Link to="/" className="relative z-10 group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <h1 className="text-xl lg:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              TODOLER
            </h1>
          </div>
        </Link>
        
        <nav className="relative z-10 px-2 lg:px-4 py-2 flex space-x-4 lg:space-x-6 items-center">
          {!token ? (
            <>
              <Link
                to="/signup"
                className="relative px-4 py-2 text-sm lg:text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                to="/login"
                className="relative px-6 py-2 text-sm lg:text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Online</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-2 text-sm lg:text-base font-semibold text-gray-700 hover:text-red-600 transition-all duration-300 group border border-gray-200 hover:border-red-200 rounded-lg"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log Out</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
