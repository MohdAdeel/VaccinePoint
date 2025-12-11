import React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sitePages } from "@/data/searcheData";
import LOGO from "../../../assets/images/Logo.png";
const Header = ({ children }) => {
  const links = ["Home", "Contact", "About"];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const lowerQuery = value.toLowerCase();

      const staticResults = sitePages.filter((page) =>
        page.content.toLowerCase().includes(lowerQuery)
      );

      setResults(staticResults);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white">
      {/* Full width header */}
      <header className="w-full bg-[#F2D7D9]">
        <div
          className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8 
                    flex flex-wrap items-center py-4 justify-between h-30"
        >
          {/* Left Logos */}
          <div className="flex items-center space-x-4">
            <img src={LOGO} alt="Logo" className="w-25 md:w-30 h-auto" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;

              return (
                <NavLink
                  key={link}
                  to={path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold text-lg"
                      : "text-gray-600 hover:text-black transition-colors text-lg"
                  }
                >
                  {link}
                </NavLink>
              );
            })}
          </nav>

          {/* Search Input */}
          <div className="hidden md:block relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-72 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none bg-white text-black"
            />
            {query && results.length > 0 && (
              <div className="absolute top-12 left-0 w-80 bg-white shadow-lg rounded-lg max-h-64 overflow-auto z-50">
                {results.map((r, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(r.path);
                      setQuery("");
                      setResults([]);
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-semibold text-[#005eb8]">{r.name}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {r.content.slice(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            )}

            {query && !isLoading && results.length === 0 && (
              <div className="absolute top-12 left-0 w-80 bg-white shadow-lg rounded-lg p-3 text-gray-500 z-50">
                No results found
              </div>
            )}
          </div>

          {/* Login Button */}
          {/* <Link to="/admin-portal">
              <button
                className="bg-white text-black px-4 sm:px-6 lg:px-8 py-4 
                           rounded-[50px] hover:bg-gray-200 transition-colors 
                           font-medium text-sm sm:text-base"
              >
                Admin Login
              </button>
            </Link> */}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white text-3xl focus:outline-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {children}
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#005eb8] text-white px-6 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-full pl-12 pr-4 py-2 text-sm focus:outline-none bg-white text-black"
              />

              {/* Search results */}
              {query && results.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-64 overflow-auto z-50">
                  {results.map((r, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        navigate(r.path);
                        setQuery("");
                        setResults([]);
                        setMenuOpen(false);
                      }}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <p className="font-semibold text-[#005eb8]">{r.name}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {r.content.slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {query && !isLoading && results.length === 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-3 text-gray-500 z-50">
                  No results found
                </div>
              )}
            </div>

            {/* Menu links */}
            {links.map((link) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              return (
                <NavLink
                  key={link}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block font-semibold text-lg"
                      : "block text-gray-200 hover:text-white transition-colors text-lg"
                  }
                >
                  {link}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>
    </main>
  );
};

export default Header;
