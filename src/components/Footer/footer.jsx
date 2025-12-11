import React from "react";
import footerLogo from "../../../assets/images/LogoNew.png";
import { Link } from "react-router-dom";
import { Linkedin, ArrowRight, Globe } from "lucide-react";

const footer = () => {
  return (
    <footer className="bg-white text-black py-8 shadow-md overflow-x-hidden">
      <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={footerLogo} alt="Footer Logo" className="w-15 h-15" />

            {/* Powered by + socials */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <p className="text-sm font-bold">Powered by Optimal Logics</p>
              <div className="flex gap-4 text-[#D3979B]">
                <a
                  href="https://optimallogics.com/"
                  target="_blank"
                  className="hover:text-[#AB787B]"
                >
                  <Globe />
                </a>
                <a
                  href="https://www.linkedin.com/company/optimallogics/"
                  target="_blank"
                  className="hover:text-[#AB787B]"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Middle section */}
          <div className="flex flex-col items-center">
            {/* Right buttons row */}
            <div className="flex flex-wrap gap-4 my-6 justify-center px-4 sm:px-8 md:px-14">
              <Link
                className="bg-[#D3979B] px-6 py-3 flex items-center justify-between text-[#fff] rounded-[15px] min-w-[150px]"
                to="/contact"
              >
                <span className="hover:underline cursor-pointer">Contact</span>
                <ArrowRight size={18} className="flex-shrink-0" />
              </Link>
              <Link
                className="bg-[#D3979B] px-6 py-3 flex items-center justify-between text-[#fff] rounded-[15px] min-w-[120px]"
                to="/about"
              >
                <span className="hover:underline cursor-pointer">About</span>
                <ArrowRight size={18} className="flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
