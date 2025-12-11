import React from "react";
import Card from "../Card/Card";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Banner from "../../../assets/images/vaccination2.jpg";
import { useAdvanceFilter } from "@/lib/Context/AdvanceFilterContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const {
    postCode,
    setPostCode,
    DOB,
    setDOB,
    selectedVaccines,
    setSelectedVaccines,
    specialConditions,
    setSpecialConditions,
  } = useAdvanceFilter();

  const vaccinationTypes = [
    { id: 1, name: "Influenza (Flu)", status: true },
    { id: 2, name: "COVID-19", status: true },
    { id: 3, name: "Tetanus, Diphtheria, Pertussis (Tdap)", status: true },
    { id: 4, name: "Hepatitis A", status: true },
    { id: 5, name: "Hepatitis B", status: true },
    { id: 6, name: "Measles, Mumps, Rubella (MMR)", status: true },
    { id: 7, name: "Varicella (Chickenpox)", status: true },
    { id: 8, name: "HPV (Human Papillomavirus)", status: false },
    { id: 9, name: "Pneumococcal", status: true },
    { id: 10, name: "Rabies", status: false },
  ];

  const activeVaccines = vaccinationTypes
    .filter((vaccine) => vaccine.status)
    .sort((a, b) => a.name.localeCompare(b.name));

  const ukPostcodeRegex =
    /^((GIR\s?0AA)|((([A-Z][0-9]{1,2})|(([A-Z][A-HJ-Y][0-9]{1,2})|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z]))))\s?[0-9][A-Z]{2}))$/i;

  const validAreas = [
    "AB",
    "AL",
    "B",
    "BA",
    "BB",
    "BD",
    "BH",
    "BL",
    "BN",
    "BR",
    "BS",
    "BT",
    "CA",
    "CB",
    "CF",
    "CH",
    "CM",
    "CO",
    "CR",
    "CT",
    "CV",
    "CW",
    "DA",
    "DD",
    "DE",
    "DG",
    "DH",
    "DL",
    "DN",
    "DT",
    "DY",
    "E",
    "EC",
    "EH",
    "EN",
    "EX",
    "FK",
    "FY",
    "G",
    "GL",
    "GY",
    "HA",
    "HD",
    "HG",
    "HP",
    "HR",
    "HS",
    "HU",
    "HX",
    "IG",
    "IM",
    "IP",
    "IV",
    "JE",
    "KA",
    "KT",
    "KW",
    "KY",
    "L",
    "LA",
    "LD",
    "LE",
    "LL",
    "LN",
    "LS",
    "LU",
    "M",
    "ME",
    "MK",
    "ML",
    "N",
    "NE",
    "NG",
    "NN",
    "NP",
    "NR",
    "NW",
    "OL",
    "OX",
    "PA",
    "PE",
    "PH",
    "PL",
    "PO",
    "PR",
    "RG",
    "RH",
    "RM",
    "S",
    "SA",
    "SE",
    "SG",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SP",
    "SR",
    "SS",
    "ST",
    "SW",
    "SY",
    "TA",
    "TD",
    "TF",
    "TN",
    "TQ",
    "TR",
    "TS",
    "TW",
    "UB",
    "W",
    "WA",
    "WC",
    "WD",
    "WF",
    "WN",
    "WR",
    "WS",
    "WV",
    "YO",
    "ZE",
  ];

  const handleConditionChange = (conditionKey) => {
    setSpecialConditions((prev) => ({
      ...prev,
      [conditionKey]: prev[conditionKey] ? null : true,
    }));
  };

  const handleSubmit = () => {
    if (!postCode || !DOB) {
      setModalMessage("Please Provide PostCode and Date of Birth");
      setModalOpen(true);
      return;
    }

    const dobDate = new Date(DOB);
    const today = new Date();

    if (isNaN(dobDate.getTime())) {
      setModalMessage("Please enter a valid Date of Birth");
      setModalOpen(true);
      return;
    }

    if (dobDate > today) {
      setModalMessage("Date of Birth cannot be in the future");
      setModalOpen(true);
      return;
    }

    const yearDiff = today.getFullYear() - dobDate.getFullYear();

    if (yearDiff > 120) {
      setModalMessage("Please enter a valid Date of Birth");
      setModalOpen(true);
      return;
    }

    const normalized = postCode
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/(.{3})$/, " $1");

    if (!ukPostcodeRegex.test(normalized)) {
      setModalMessage("Please enter a valid UK postCode");
      setModalOpen(true);
      return;
    }

    const areaCode = normalized.match(/^[A-Z]+/)[0];
    if (!validAreas.includes(areaCode)) {
      setModalMessage("Please enter a postCode in a valid area");
      setModalOpen(true);
      return;
    }

    setShowConditionsModal(true);
  };

  const submitSpecialCondition = () => {
    navigate("/findImmunisationServices");
  };

  return (
    <div className="relative">
      <div className="relative h-60 sm:h-80 md:h-100 lg:h-130 mt-10 md:mt-20 rounded-[20px] overflow-hidden z-0">
        <img
          src={Banner}
          alt="Banner_Img"
          className="w-full h-full object-cover object-center sm:object-[10%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#D3979B99] via-[#D3979B40] to-[#FFFFFF00] pointer-events-none" />
      </div>
      <div
        className="
    absolute
    top-[20%]       
    sm:top-[20%]     
    md:top-[15%]     
    left-1/2
    transform
    -translate-x-1/2
    w-full
    flex
    justify-center
    z-50
  "
      >
        <div className="text-center text-white px-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl my-4 mb-25 sm:mb-40 md:mb-5">
            Find Your Nearest Immunisation Clinic
          </h1>

          <h1 className="hidden md:block text-lg md:text-2xl mb-5 md:mb-45 lg:mb-70 font-thin">
            Locate your local walk-in immunisation clinic with ease
          </h1>

          {/* Search Card */}
          <Card className="max-w-sm sm:max-w-2xl md:max-w-6xl mx-auto text-black p-4 sm:p-4 md:p-6">
            <div className="flex items-end space-x-1 sm:space-x-4 md:space-x-6">
              {/* Postcode */}
              <div className="text-left flex-1">
                <label className="block font-semibold mb-1 text-xs sm:text-sm md:text-base">
                  Postcode
                </label>
                <input
                  type="text"
                  placeholder="Enter Postcode"
                  className="w-full border-0 outline-none focus:ring-0 text-xs sm:text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm"
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </div>
              <div className="w-px bg-[#E8EDEE] self-stretch" />

              <div className="text-left flex-1">
                <label className="block font-semibold mb-1 text-xs sm:text-sm md:text-base">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  min={`${new Date().getFullYear() - 120}-01-01`}
                  className="w-full border-0 outline-none focus:ring-0 text-xs sm:text-sm md:text-base text-gray-500
                  [color-scheme:light] 
                  [&::-webkit-datetime-edit]:text-gray-500
                  [&::-webkit-calendar-picker-indicator]:opacity-60 
                  hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
              <div className="w-px bg-[#E8EDEE] self-stretch" />

              <div className="text-left flex-1">
                <label className="block font-semibold mb-1 text-xs sm:text-sm md:text-base">
                  Vaccination
                </label>
                <select
                  className="w-full border-0 outline-none focus:ring-0 text-xs sm:text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm"
                  defaultValue=""
                  onChange={(e) => setSelectedVaccines(e.target.value)}
                >
                  <option value="" disabled hidden>
                    View options
                  </option>
                  {activeVaccines.map((vaccine) => (
                    <option
                      key={vaccine.vaccinationTypeID}
                      value={vaccine.vaccinationTypeID}
                    >
                      {vaccine.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="ml-2 sm:ml-4 bg-[#D3979B] text-white font-bold w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors hover:bg-[#AB787B] group"
                onClick={handleSubmit}
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        title="Validation Error"
        message={modalMessage}
        confirmLabel="OK"
        cancelLabel="Close"
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
      />

      <AnimatePresence>
        {showConditionsModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConditionsModal(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-hidden border border-gray-100"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{
                duration: 0.4,
                type: "spring",
                bounce: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Orbs */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>

              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={() => setShowConditionsModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:rotate-90 transform"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#D3979B] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Modal Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Special Conditions
                </h3>

                <p className="text-gray-600 text-center mb-6 text-sm">
                  Select any conditions that apply to you
                </p>

                {/* Special Conditions */}
                <div className="my-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Chronic Respiratory disease",
                        key: "chronicRespiratoryDisease",
                      },
                      { label: "Immunosuppression", key: "immunosuppression" },
                      {
                        label: "Chronic heart disease and vascular disease",
                        key: "chronicHeartDisease",
                      },
                      {
                        label:
                          "Chronic conditions of the kidney, liver or digestive system",
                        key: "chronicKidneyLiverDigestive",
                      },
                      {
                        label: "Chronic neurological disease",
                        key: "chronicNeurologicalDisease",
                      },
                      {
                        label: "Endocrine disorders",
                        key: "endocrineDisorders",
                      },
                      {
                        label: "Asplenia or dysfunction of the spleen",
                        key: "aspleniaOrSpleenDysfunction",
                      },
                      { label: "Morbid obesity", key: "morbidObesity" },
                      {
                        label: "Severe mental illness",
                        key: "severeMentalIllness",
                      },
                      { label: "Pregnancy", key: "Pregnancy" },
                      {
                        label:
                          "Serious genetic abnormalities that affect multiple systems",
                        key: "seriousGeneticAbnormalities",
                      },
                      {
                        label: "Learning Disability",
                        key: "learningDisability",
                      },
                    ].map((condition) => (
                      <label
                        key={condition.key}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={specialConditions[condition.key] === true}
                          onChange={() => handleConditionChange(condition.key)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-sm">
                          {condition.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={submitSpecialCondition}
                  className="
                  w-full font-semibold rounded-xl py-4 transition-all duration-200
                  bg-gradient-to-r from-[#D3979B] to-[#C28489]
                  hover:from-[#C28489] hover:to-[#B17378]
                  text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]
                  active:scale-[0.98] active:shadow-md
                  focus:outline-none focus:ring-4 focus:ring-[#D3979B]/40
                  relative overflow-hidden group
                "
                >
                  <span className="relative z-10">
                    {Object.values(specialConditions).some((val) => val)
                      ? "Submit"
                      : "Skip"}
                  </span>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
