import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-full shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
