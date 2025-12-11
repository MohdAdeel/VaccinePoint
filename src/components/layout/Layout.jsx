// src/components/layout/Layout.jsx
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
