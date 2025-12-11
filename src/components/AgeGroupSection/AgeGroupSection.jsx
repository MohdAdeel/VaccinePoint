import React from "react";
import pregnancyImg from "../../../assets/images/mum-and-baby-pic.webp";
import preschoolImg from "../../../assets/images/Playing_Children.webp";
import schoolImg from "../../../assets/images/school-age.jpg";
import youthImg from "../../../assets/images/youth.jpg";
import adultImg from "../../../assets/images/Older-man.jpg";
import rehabImg from "../../../assets/images/rehab.webp";
const ageGroups = [
  {
    title: "Pregnancy and newborn",
    subtitle: "pre-pregnancy until 1 years of age",
    image: pregnancyImg,
    Link: "#",
  },
  {
    title: "Pre-school",
    subtitle: "Ages 1 until 5 years old",
    image: preschoolImg,
    Link: "#",
  },
  {
    title: "School age",
    subtitle: "5-15 years old",
    image: schoolImg,
    Link: "#",
  },
  {
    title: "Young people",
    subtitle: "age 16 until 25",
    image: youthImg,
    Link: "#",
  },
  {
    title: "Adults",
    subtitle: "older than 25 years",
    image: adultImg,
    Link: "#",
  },
  {
    title: "Special conditions",
    subtitle: "vaccine info for people with special health needs",
    image: rehabImg,
    Link: "#",
  },
];

const AgeGroupSection = () => {
  return (
    <section className="relative w-full bg-[#F2D7D9] py-12 my-32">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-full">
        <svg
          className="block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q720,200 1440,0 L1440,150 L0,150 Z" fill="#F2D7D9" />
        </svg>
      </div>

      <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl text-center mb-12">
          For available vaccinations please visit the relevant sessions below
        </h2>

        {/* Age Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ageGroups.map((group, index) => (
            <a
              key={index}
              href={group.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-[30px] hover:shadow-2xl transition-shadow bg-white p-5 block"
            >
              <div className="h-80 mb-4 rounded-lg overflow-hidden">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-l font-bold mb-2 text-left">{group.title}</h3>
              <h3 className="text-l text-left mb-2">{group.subtitle}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-full">
        <svg
          className="block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path d="M0,150 Q720,-50 1440,150 L1440,0 L0,0 Z" fill="#F2D7D9" />
        </svg>
      </div>
    </section>
  );
};

export default AgeGroupSection;
