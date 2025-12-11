import React from "react";

const Loader = () => {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="flex items-center justify-center">
      {/* Main Container */}
      <div className="relative">
        {/* Background Circle */}
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-blue-100/40"
          />

          {/* Animated progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              animation:
                "loader-spin 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite",
              transformOrigin: `${size / 2}px ${size / 2}px`,
            }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005EB8" />
              <stop offset="50%" stopColor="#0078D4" />
              <stop offset="100%" stopColor="#40A9FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,94,184,0.1) 0%, transparent 70%)",
            animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes loader-spin {
            0% {
              stroke-dashoffset: ${circumference};
              transform: rotate(0deg);
            }
            50% {
              stroke-dashoffset: ${circumference * 0.25};
              transform: rotate(180deg);
            }
            100% {
              stroke-dashoffset: ${circumference};
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
