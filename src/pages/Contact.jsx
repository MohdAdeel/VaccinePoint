import React from "react";
import { Share2 } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import contact from "../../assets/images/customerSupport.webp";

const Contact = () => {
  return (
    <Layout>
      <div className="relative w-full h-[400px] my-10 rounded-4xl overflow-hidden">
        <img
          src={contact}
          alt="Contact Us"
          className="w-full h-full object-cover object-[10%_30%] rounded-2xl"
        />
        <div className="absolute inset-0 bg-[#D3979B99]/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl text-lg ">
            To contact our Central Booking Team for support in accessing a walk
            in vaccination appointment, or direction to other information please
            call 0000 000 0000 and select option 1 for vaccinations. These call
            lines are staffed <br /> Monday – Friday 09:00-16:00.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto my-12 px-6">
        <p className="text-left text-lg text-gray-700 mb-8">
          We’d love to hear from you. Whether you’re looking for more
          information about our services or need assistance, our team is ready
          to help.
        </p>

        <div className="space-y-6 ">
          {/* Call Us */}
          <div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-black" />
              <span className="font-semibold">Call Us</span>
            </div>
            <p className="ml-7 text-gray-700">0000 000 0000</p>
          </div>

          {/* Email Us */}
          <div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-black" />
              <span className="font-semibold">Email Us</span>
            </div>
            <p className="ml-7 text-gray-700">
              <span className="font-bold text-gray-500">
                Vaccine Related Enquiries:
              </span>{" "}
              test@test.com
            </p>
            <p className="ml-7 text-gray-700">
              <span className="font-bold text-gray-500">
                {" "}
                General Enquiries:{" "}
              </span>{" "}
              test@test.com
            </p>
          </div>

          {/* Visit Us */}
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-black" />
              <span className="font-semibold">Visit Us</span>
            </div>
            <p className="ml-7 text-gray-700">
              Test Location, somewhere on Earth
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-black" />
              <span className="font-semibold">Opening Hours</span>
            </div>
            <p className="ml-7 text-gray-700">
              Monday – Friday:{" "}
              <span className=" text-[#009639]"> 9 AM – 5 PM</span>
            </p>
            <p className="ml-7 text-gray-700">
              Saturday & Sunday:
              <span className=" text-[#DA291C]"> Closed</span>
            </p>
          </div>

          {/* Connect With Us */}
          <div>
            <div className="flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-black" />
              <span className="font-semibold">Connect With Us</span>
            </div>

            <div className="ml-7 mt-2 flex space-x-6">
              {/* LinkedIn */}
              <Link
                className="flex items-center space-x-2 cursor-pointer"
                to="https://www.linkedin.com/company/patient-care-locally-cic/"
                target="_blank"
              >
                <Linkedin className="w-5 h-5 text-[#D3979B]" />
                <span className="text-[#D3979B]">LinkedIn</span>
              </Link>

              {/* Facebook */}
              <Link
                className="flex items-center space-x-2 cursor-pointer"
                to="https://www.facebook.com/PCLUnitedKingdom?rdid=DKlxRK23QNXWiCW5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14MnA4vwgYe%2F"
                target="_blank"
              >
                <Facebook className="w-5 h-5 text-[#D3979B] " />
                <span className="text-[#D3979B]">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
