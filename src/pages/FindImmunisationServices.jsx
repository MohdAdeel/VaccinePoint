import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import Toast from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import ClinicCarousel from "@/components/ClinicCard/ClinicCarousel";
import { useAdvanceFilter } from "@/lib/Context/AdvanceFilterContext";
import { clinicData } from "@/data/sampleClinicData";
const FindImmunisationServices = () => {
  const {
    postCode,
    setPostCode,
    DOB,
    setDOB,
    selectedVaccines,
    setSelectedVaccines,
    availability,
    setAvailability,
    customDates,
    setCustomDates,
    accessibility,
    setAccessibility,
    specialConditions,
    setSpecialConditions,
  } = useAdvanceFilter();
  const [cohort, setCohort] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [DOBError, setDOBError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(95);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [noClinicMessage, setNoClinicMessage] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const showApply =
    selectedVaccines !== "" ||
    availability !== "" ||
    accessibility.length > 0 ||
    DOB !== "" ||
    Object.values(specialConditions).some((v) => v === true);

  const handleCheckbox = (value, setter, state) => {
    if (state.includes(value)) {
      setter(state.filter((v) => v !== value));
    } else {
      setter([...state, value]);
    }
  };

  const handleApply = () => {
    setSearchedData(clinicData);
  };

  const defaultSpecialConditions = {
    chronicRespiratoryDisease: null,
    immunosuppression: null,
    chronicHeartDisease: null,
    chronicKidneyLiverDigestive: null,
    chronicNeurologicalDisease: null,
    aspleniaOrSpleenDysfunction: null,
    endocrineDisorders: null,
    learningDisability: null,
    morbidObesity: null,
    seriousGeneticAbnormalities: null,
    severeMentalIllness: null,
    Pregnancy: null,
  };

  const handleReset = () => {
    setSearchedData([]);
    setPostCode("");
    setSpecialConditions(defaultSpecialConditions);
    setDistanceFilter(95);
    setDOB("");
    setCustomDates({ from: "", to: "" });
    setSelectedVaccines("");
    setAvailability("");
    setAccessibility([]);
  };

  useEffect(() => {
    setSearchedData(clinicData);
  }, []);

  return (
    <Layout>
      <div className="mt-10 mb-6 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Immunisation Services
        </h1>
        <p className="text-gray-700 text-base mt-4 leading-relaxed">
          The Walk-In Immunisation Finder helps you check vaccination
          eligibility and find convenient sites. PCL is not responsible for
          eligibility decisions or site opening times; please confirm details
          with the site before travelling.
        </p>
        <div className="md:hidden flex items-center justify-center my-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="bg-[#D3979B] hover:bg-[#004A91] text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Drawer with Filters + Map */}
        <aside className="hidden md:block w-80 bg-white rounded-2xl shadow-md p-6 space-y-6 md:mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>

            {showApply && (
              <div className="flex gap-2">
                <button
                  className="bg-[#D3979B] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#AB787B] transition"
                  onClick={handleApply}
                >
                  Apply
                </button>
                <button
                  className="bg-gray-400 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Distance Filter */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Distance:{" "}
              <span className="font-small text-gray-400 text-xs">
                Within {distanceFilter} Miles
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="150"
              step="1"
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(Number(e.target.value))}
              className="w-full accent-[#D3979B]"
            />
          </div>
          {/* PostCode Here */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Postcode
            </label>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
              />
            </div>
          </div>

          <p className="text-gray-600 mb-2 ml-1 text-sm">Date of Birth *</p>
          <input
            type="date"
            value={DOB}
            onChange={(e) => {
              setDOB(e.target.value);
              if (e.target.value) setDOBError("");
            }}
            max={new Date().toISOString().split("T")[0]}
            className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
              ${
                DOBError
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                  : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:shadow-lg"
              }
              placeholder:text-gray-400 text-gray-900
              `}
            placeholder="Select date"
          />
          {DOBError ? <p className="text-red-500 text-xs">{DOBError}</p> : null}

          {/* Vaccine Type (Radios) */}
          {/* <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Vaccine Type
            </label>
            <div className="flex flex-wrap gap-4">
              {activeVaccines?.map((type) => (
                <label
                  key={type.vaccinationTypeID}
                  className="flex items-center gap-2 text-xs"
                >
                  <input
                    type="radio"
                    name="vaccineType"
                    className="accent-[#D3979B] border-2 border-gray-200"
                    checked={type.vaccinationTypeID}
                    onChange={() => {
                      setCohort("");
                      setSelectedVaccines(type.vaccinationTypeID);
                    }}
                  />
                  <span>{type.name}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Availability (Radio) */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Availability
            </label>
            <div className="flex flex-col gap-3">
              {["Today", "Next 7 Days", "Custom"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="availability"
                    className="accent-[#D3979B]"
                    checked={availability === opt}
                    onChange={() => setAvailability(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}

              {/* Show From / To inputs only when Custom is selected */}
              {availability === "Custom" && (
                <div className="flex flex-col gap-2 pl-6">
                  {/* FROM DATE */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-10">From:</span>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={customDates.from}
                      onChange={(e) =>
                        setCustomDates((prev) => ({
                          ...prev,
                          from: e.target.value,
                          to:
                            prev.to && prev.to < e.target.value ? "" : prev.to,
                        }))
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                  </div>

                  {/* TO DATE */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-10">To:</span>
                    <input
                      type="date"
                      min={
                        customDates.from ||
                        new Date().toISOString().split("T")[0]
                      }
                      value={customDates.to}
                      onChange={(e) =>
                        setCustomDates((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Accessibility */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Accessibility
            </label>
            <div className="flex flex-wrap justify-start gap-3">
              {["Free Parking", "Disabled Access", "Toilets"].map((item) => (
                <label key={item} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    className="accent-[#D3979B]"
                    checked={accessibility.includes(item)}
                    onChange={() =>
                      handleCheckbox(item, setAccessibility, accessibility)
                    }
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SpecialCondition */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Special Condition
            </label>
            <div className="flex flex-wrap justify-start gap-3">
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
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 text-xs"
                >
                  <input
                    type="checkbox"
                    className="accent-[#D3979B]"
                    checked={specialConditions[item.key] || false}
                    onChange={() =>
                      setSpecialConditions((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        {searchedData && searchedData.length > 0 ? (
          <section className="flex-1">
            <ClinicCarousel
              searchedData={searchedData}
              selectedVaccines={selectedVaccines}
              postCode={postCode}
              distanceFilter={distanceFilter}
              specialConditions={specialConditions}
            />
          </section>
        ) : loading ? (
          <section className="flex flex-1 items-center justify-center min-h-[70vh]">
            <Loader />
          </section>
        ) : (
          noClinicMessage && (
            <section className="flex flex-1 justify-center mx-10 my-20 md:mx-30 md:my-60">
              <p className="text-gray-500 text-lg font-medium text-center">
                Your age and/or Condition has indicated you are not eligible for
                this vaccine, please ensure any special conditions have been
                selected. Alternatively, please check your vaccine eligibility
                before searching for a clinic. For any queries, please visit{" "}
                <a
                  className="text-[#D3979B] font-semibold hover:text-[#004a94] transition-colors duration-300 inline-flex items-center"
                  href="#"
                  target="_blank"
                >
                  Here
                  <svg
                    className="w-4 h-4 ml-1"
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
            </section>
          )
        )}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
        <ConfirmModal
          isOpen={modalOpen}
          title="Validation Error"
          message={modalMessage}
          confirmLabel="OK"
          cancelLabel="Close"
          onClose={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
        />
      </div>
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFilterOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide-in filter panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="relative h-full w-3/4 sm:w-1/2 bg-white shadow-2xl p-6 overflow-y-auto rounded-r-2xl space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{
                willChange: "transform",
                pointerEvents: "auto",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-600 px-2 py-1 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {showApply && (
                <div className="flex gap-2 mb-4">
                  <button
                    className="bg-[#D3979B] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#004a92] transition"
                    onClick={() => {
                      handleApply();
                      setMobileFilterOpen(false);
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className="bg-gray-400 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Distance Filter */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Distance:{" "}
                  <span className="font-small text-gray-400 text-xs">
                    Within {distanceFilter} Miles
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="150"
                  step="1"
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(Number(e.target.value))}
                  className="w-full accent-[#D3979B]"
                />
              </div>
              {/* PostCode Here */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Postcode
                </label>
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                  />
                </div>
              </div>

              <p className="text-gray-600 mb-2 ml-1 text-sm">Date of Birth *</p>
              <input
                type="date"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                  if (e.target.value) setDOBError("");
                }}
                max={new Date().toISOString().split("T")[0]}
                className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none appearance-none
              ${
                DOBError
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                  : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:shadow-lg"
              }
              placeholder:text-gray-400 text-gray-900
              `}
                placeholder="Select date"
              />
              {DOBError ? (
                <p className="text-red-500 text-xs">{DOBError}</p>
              ) : null}

              {/* Vaccine Type (Single-select Checkboxes) */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Vaccine Type
                </label>
                <div className="flex flex-wrap gap-4">
                  {activeVaccines?.map((type) => (
                    <label
                      key={type.vaccinationTypeID}
                      className="flex items-center gap-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#D3979B]"
                        checked={selectedVaccines === type.vaccinationTypeID}
                        onChange={() => {
                          // Allow only one selection at a time
                          setCohort("");
                          setSelectedVaccines((prev) =>
                            prev === type.vaccinationTypeID
                              ? ""
                              : type.vaccinationTypeID
                          );
                        }}
                      />
                      <span>{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability (Single-select Checkboxes) */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="flex flex-col gap-3">
                  {["Today", "Next 7 Days", "Custom"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#D3979B]"
                        checked={availability === opt}
                        onChange={() =>
                          setAvailability((prev) => (prev === opt ? "" : opt))
                        }
                      />
                      <span>{opt}</span>
                    </label>
                  ))}

                  {/* Show From / To inputs only when Custom is selected */}
                  {availability === "Custom" && (
                    <div className="flex flex-col gap-2 pl-6">
                      {/* FROM DATE */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-10">
                          From:
                        </span>
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={customDates.from}
                          onChange={(e) =>
                            setCustomDates((prev) => ({
                              ...prev,
                              from: e.target.value,
                              to:
                                prev.to && prev.to < e.target.value
                                  ? ""
                                  : prev.to,
                            }))
                          }
                          className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                        />
                      </div>

                      {/* TO DATE */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-10">To:</span>
                        <input
                          type="date"
                          min={
                            customDates.from ||
                            new Date().toISOString().split("T")[0]
                          }
                          value={customDates.to}
                          onChange={(e) =>
                            setCustomDates((prev) => ({
                              ...prev,
                              to: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Accessibility
                </label>
                <div className="flex flex-wrap justify-start gap-3">
                  {["Free Parking", "Disabled Access", "Toilets"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-xs"
                      >
                        <input
                          type="checkbox"
                          className="accent-[#D3979B]"
                          checked={accessibility.includes(item)}
                          onChange={() =>
                            handleCheckbox(
                              item,
                              setAccessibility,
                              accessibility
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* SpecialCondition */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Special Condition
                </label>
                <div className="flex flex-wrap justify-start gap-3">
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
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#D3979B]"
                        checked={specialConditions[item.key] || false}
                        onChange={() =>
                          setSpecialConditions((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key],
                          }))
                        }
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default FindImmunisationServices;
