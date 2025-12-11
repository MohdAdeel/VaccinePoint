import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const FallBackPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6 overflow-hidden">
      {/* Icon */}
      <div className="bg-[#005eb8]/10 p-6 rounded-full mb-6 animate-pulse">
        <AlertTriangle size={64} className="text-[#AB787B]" />
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold text-[#D3979B] mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-8">
        The page you’re looking for doesn’t exist or may have been moved. Please
        check the URL or return to the home page.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#D3979B] text-white rounded-lg shadow-md hover:bg-[#004b91] transition-colors duration-200"
      >
        Go Back Home
      </button>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#D3979B"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,165.3C384,139,480,117,576,128C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default FallBackPage;
