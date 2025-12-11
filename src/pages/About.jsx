import React from "react";
import Layout from "@/components/layout/Layout";
import about from "../../assets/images/AboutUS.jpg";
const About = () => {
  return (
    <Layout>
      <div className="relative w-full h-[400px] my-10 rounded-4xl overflow-hidden">
        <img
          src={about}
          alt="About Us"
          className="w-full h-full object-cover object-[80%_20%] rounded-2xl"
        />
        <div className="absolute inset-0 bg-[#D3979B99]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <p className="max-w-lg text-lg ">
            We are committed to providing greater access to clinically
            appropriate, high quality, easily accessible patient care outside of
            hospital trusts. We are committed to providing greater access to
            clinically appropriate, high quality, easily accessible patient care
            outside of hospital trusts. We are committed to providing greater
            access to clinically appropriate, high quality, easily accessible
            patient care outside of hospital trusts.
          </p>
        </div>
      </div>
      <div
        className="
    grid 
    grid-cols-1 md:grid-cols-[1fr_3fr] 
    gap-6 my-10 items-center
  "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#AE2573] text-center md:text-left">
          Section One Title
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700 text-sm sm:text-base">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fringilla, libero eget porttitor porttitor, lectus nisi vehicula
            dui, sit amet pretium magna orci vel lacus. Integer a mauris vitae
            lorem consequat egestas vitae non massa. We are committed to
            providing greater access to clinically appropriate, high quality,
            easily accessible patient care outside of hospital trusts. We are
            committed to providing greater access to clinically appropriate,
            high quality, easily accessible patient care outside of hospital
            trusts.
          </p>
        </div>
      </div>

      <div
        className="
    grid 
    grid-cols-1 md:grid-cols-[1fr_3fr] 
    gap-6 my-10 items-center
  "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#ED8B00] text-center md:text-left">
          Section Two Title
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700 text-sm sm:text-base">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore. We are
            committed to providing greater access to clinically appropriate,
            high quality, easily accessible patient care outside of hospital
            trusts. We are committed to providing greater access to clinically
            appropriate, high quality, easily accessible patient care outside of
            hospital trusts.
          </p>
        </div>
      </div>

      <div
        className="
    grid 
    grid-cols-1 md:grid-cols-[1fr_3fr] 
    gap-6 my-10 items-center
  "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#009639] text-center md:text-left">
          Section Three Title
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700 text-sm sm:text-base">
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident. Nam libero tempore, cum soluta nobis est eligendi optio.
            We are committed to providing greater access to clinically
            appropriate, high quality, easily accessible patient care outside of
            hospital trusts. We are committed to providing greater access to
            clinically appropriate, high quality, easily accessible patient care
            outside of hospital trusts.
          </p>
        </div>
      </div>

      <div
        className="
    grid 
    grid-cols-1 md:grid-cols-[1fr_3fr] 
    gap-6 my-10 items-center
  "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#330072] text-center md:text-left">
          Section Four Title
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700 text-sm sm:text-base">
          <p>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur. Vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur? Cras ultricies, justo ac tincidunt
            pharetra, nisi dui luctus nisl, sed varius massa sapien in lacus. We
            are committed to providing greater access to clinically appropriate,
            high quality, easily accessible patient care outside of hospital
            trusts. We are committed to providing greater access to clinically
            appropriate, high quality, easily accessible patient care outside of
            hospital trusts.
          </p>
        </div>
      </div>

      <p
        className="
    text-center
    text-sm sm:text-base
    flex flex-col md:flex-row
    items-center
    justify-center
    gap-1 md:gap-2
  "
      >
        <span>
          To find out more about us and the other services we offers, please
          visit our website:
        </span>
        <a
          className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 break-all"
          href="https://optimallogics.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://optimallogics.com
        </a>
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 my-10 text-center px-10">
        <p>
          To contact our Central Booking Team for support in accessing a walk in
          vaccination appointment, or direction to other information please call{" "}
          <span className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 cursor-pointer">
            0000 000 0000{" "}
          </span>
          and select option 1 for vaccinations. These call lines are staffed{" "}
          <span className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 cursor-pointer">
            Monday – Friday 09:00-16:00.
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default About;
