import React from "react";

const Vaccines = [
  {
    id: 1,
    title: "Pneumococcal",
    description:
      "Protects against pneumococcal bacteria, which can cause pneumonia, blood infections, and meningitis—especially important for older adults and people with chronic conditions.",
    txtColor: "#ED8B00",
  },
  {
    id: 2,
    title: "Shingles (Herpes Zoster)",
    description:
      "Reduces the risk of shingles and the long-lasting nerve pain it can cause. Recommended mainly for older adults.",
    txtColor: "#00A9CE",
  },
  {
    id: 3,
    title: "Hepatitis B",
    description:
      "A highly effective vaccine that protects against hepatitis B virus, which infects the liver and can lead to chronic disease or cancer.",
    txtColor: "#AE2573",
  },
  {
    id: 4,
    title: "Tetanus, Diphtheria (Td)",
    description:
      "A booster vaccine that protects against tetanus and diphtheria—often recommended every 10 years or after certain injuries.",
    txtColor: "#78BE20",
  },
  {
    id: 5,
    title: "Chickenpox (Varicella)",
    description:
      "Helps prevent chickenpox, a highly contagious virus that causes fever and an itchy blistering rash. Recommended for children and adults who have not had it before.",
    txtColor: "#DA291C",
  },
  {
    id: 6,
    title: "Rabies",
    description:
      "Protects against the rabies virus, a serious and often fatal infection transmitted through animal bites. Recommended for travellers, people working with animals, and anyone at risk of exposure.",
    txtColor: "#0072CE",
  },
];

const VaccinesGrid = () => {
  return (
    <div className="py-18 md:py-22 w-full">
      <p className="text-gray-800 text-base leading-relaxed text-lg text-center mb-5">
        If you want to book an appointment, visit{" "}
        <a
          className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 inline-flex items-center ml-0.5 md:ml-1.5"
          href=":#"
          target="_blank"
        >
          Here
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </p>
      <div className="hidden sm:inline-block bg-[#D3979B] px-4 py-4 rounded-[30px]">
        <h2 className="text-l text-[#fff]">VACCINES</h2>
      </div>

      <div className="font-bold lg:text-3xl text-2xl my-8 text-center md:text-left">
        <h1>
          Get <span className="text-[#D3979B]">Protected.</span> Stay{" "}
          <span className="text-[#D3979B]">Healthy.</span>
        </h1>
      </div>

      <div className="max-w-3xl text-center mt-6 mb-8 relative mx-auto">
        <div className="w-16 h-1 bg-[#005EB8] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-800 text-base leading-relaxed text-lg">
          Vaccines currently available via the Walk In Immunisation Finder are
          as below. For further information on other vaccinations please visit{" "}
          <a
            href="#"
            target="_blank"
            className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 inline-flex items-center gap-1"
          >
            Hub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </p>
      </div>

      {/* Full-width wrapper */}
      <div className="w-full bg-[#E8EDEE] p-6 sm:p-8 rounded-[30px]">
        {/* Grid of vaccine cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
               gap-4 sm:gap-6 justify-items-center"
        >
          {Vaccines.map((vaccine) => (
            <div
              key={vaccine.id}
              className="bg-white shadow-md rounded-2xl p-4 sm:p-6 
                   flex flex-col justify-start w-full max-w-[400px] h-auto 
                   text-start transform transition-all duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-xl hover:-translate-y-2"
            >
              <h3
                className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300"
                style={{ color: vaccine.txtColor }}
              >
                {vaccine.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {vaccine.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccinesGrid;
