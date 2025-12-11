import React from "react";
import { useState } from "react";
import { Car } from "lucide-react";
import { Toilet } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Accessibility } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, Users, Syringe, MapPin, Clock, X } from "lucide-react";
import GoogleMapComponent from "@/components/GoogleMap/GoogleMapComponent";

const CardView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clinic, location, locationDistance, postCode, specialConditions } =
    state || {};
  const [showHoursModal, setShowHoursModal] = useState(false);

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <Layout>
      <div className="p-4 my-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#005EB8] hover:underline mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        {/* Main Div */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-xl overflow-hidden border border-gray-300">
              {GoogleMapComponent &&
              location?.latitude &&
              location?.longitude ? (
                <GoogleMapComponent
                  apiKey={import.meta.env.VITE_GOOGLE_LOCATION_API}
                  latitude={location.latitude}
                  longitude={location.longitude}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
                  <div className="text-center z-10">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold text-base md:text-lg">
                      Map View
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm mt-2">
                      Location will be displayed here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Info & Availability */}
            <div className="mt-8">
              <h2 className="text-2xl font-medium text-black-400 flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">Vaccination Types</div>
              </h2>
              <div className="flex flex-wrap gap-4 cursor-pointer">
                {clinic?.relatedVaccinationTypes?.map((v) => (
                  <div className="bg-white rounded-4xl shadow-md py-3 px-5 space-y-5 border border-gray-100 hover:shadow-2xl transition-shadow tanslate duration-300">
                    <h1>{v.name}</h1>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-medium text-black-400 flex items-center justify-between gap-2 my-6">
                <div className="flex items-center gap-2">
                  Special Conditions
                </div>
              </h2>
              <div className="flex flex-wrap gap-4 cursor-pointer">
                {Object.entries(specialConditions)
                  .filter(([key, value]) => value === true)
                  .map(([key]) => (
                    <div
                      key={key}
                      className="bg-white rounded-4xl shadow-md py-3 px-5 space-y-5 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                      <h1>{formatLabel(key)}</h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <h1 className="font-semibold text-2xl md:text-3xl mb-4">
                {clinic?.clinicName}
              </h1>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex flex-col space-y-4 text-gray-700 text-sm md:text-base">
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} />
                    {clinic?.telephone}
                  </p>

                  <p className="flex items-center gap-2 text-gray-700">
                    <MapPin size={45} />
                    {location?.addressLine1 +
                      ", " +
                      location?.addressLine2 +
                      ", " +
                      location?.townCity +
                      ", " +
                      location?.country +
                      " - " +
                      location?.postcode}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold">{locationDistance}</span>{" "}
                    Miles From -{" "}
                    <span className="font-semibold">{postCode}</span>
                  </p>
                </div>

                <div className="ml-6">
                  <img
                    src={clinic?.clinicImageUrl}
                    alt="Clinic Image"
                    className="h-48 w-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full h-60 my-6">
              <h1 className="font-semibold text-2xl mb-4">
                Addition Information
              </h1>

              <div className="mt-2 flex flex-col gap-7">
                <p
                  className={`text-gray-700 h-25 ${
                    location?.additionalInformation ? "overflow-y-scroll" : ""
                  }`}
                >
                  {location?.additionalInformation}
                </p>
                <div className="flex justify-end gap-5">
                  {location.onSiteFreeParking && (
                    <div className="flex items-center gap-2 text-[#005EB8]">
                      <Car className="w-6 h-6" />
                      <span className="text-[#005EB8] text-sm font-bold text-center ">
                        Free Parking
                      </span>
                    </div>
                  )}

                  {location.disabledAccess && (
                    <div className="flex items-center gap-2 text-[#005EB8]">
                      <Accessibility className="w-6 h-6" />
                      <span className="text-[#005EB8] text-sm font-bold text-center ">
                        Disabled Access
                      </span>
                    </div>
                  )}

                  {location.toilets && (
                    <div className="flex items-center gap-2 text-[#005EB8]">
                      <Toilet className="w-6 h-6" />
                      <span className="text-[#005EB8] text-sm font-bold text-center ">
                        Toilets Available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full h-100 my-6">
              <h1 className="font-semibold text-2xl mb-4">Operating Hours</h1>

              {/* Scrollable Wrapper */}
              <div className="mt-3 flex flex-col gap-5 max-h-[300px] overflow-y-auto pr-2">
                {location?.dateTimeSlots?.length > 0 ? (
                  [...location.dateTimeSlots]
                    .sort(
                      (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    )
                    .map((slot) => (
                      <div
                        key={slot.dateTimeID}
                        className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg"
                      >
                        {/* Date Range Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-[#005EB8] to-[#0078D4] rounded-full"></div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                Operating Hours
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(slot.startDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(slot.endDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Weekly Schedule */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(slot.weeklySchedule || {})
                            .filter(
                              ([, times]) =>
                                Array.isArray(times) && times.length > 0
                            )
                            .map(([day, times]) => (
                              <div
                                key={day}
                                className="bg-gradient-to-br from-white to-gray-50/80 border border-gray-200/50 rounded-xl p-4"
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-3 h-3 bg-[#005EB8] rounded-full"></div>
                                  <span className="font-semibold text-gray-900 capitalize text-sm">
                                    {day}
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  {times.map((timeSlot, i) => {
                                    const start =
                                      timeSlot.startTime ||
                                      timeSlot.start_time ||
                                      timeSlot.start;
                                    const end =
                                      timeSlot.endTime ||
                                      timeSlot.end_time ||
                                      timeSlot.end;
                                    const breakStart =
                                      timeSlot.exceptionStartTime ||
                                      timeSlot.exception_start_time;
                                    const breakEnd =
                                      timeSlot.exceptionEndTime ||
                                      timeSlot.exception_end_time;

                                    return (
                                      <div key={i} className="space-y-1">
                                        <div className="flex items-center justify-between bg-blue-50/70 rounded-lg p-2">
                                          <span className="text-sm font-medium text-gray-800">
                                            {start ? start.slice(0, 5) : "N/A"}{" "}
                                            - {end ? end.slice(0, 5) : "N/A"}
                                          </span>
                                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        </div>

                                        {breakStart && breakEnd && (
                                          <div className="flex items-center justify-between bg-orange-50/70 rounded-lg p-2 ml-2">
                                            <span className="text-xs text-orange-700 italic">
                                              Closed: {breakStart.slice(0, 5)} -{" "}
                                              {breakEnd.slice(0, 5)}
                                            </span>
                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Exception Dates */}
                        {slot.exceptionDates?.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-gray-200/50">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <p className="text-sm font-semibold text-red-700">
                                Closed Dates
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {slot.exceptionDates.map((ex, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50/80 
                      text-red-700 rounded-full border border-red-200/50 text-xs font-medium"
                                >
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  {new Date(ex.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-600">No operating hours available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showHoursModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 
           bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHoursModal(false)}
          >
            {/* Modal */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 
             w-full max-w-4xl relative overflow-hidden max-h-[85vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="relative px-8 py-6">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-blue-600 mb-1">
                    Operating Hours
                  </h2>
                  <p className="text-blue-500 text-sm">
                    {clinic?.clinicName || "Clinic Schedule"}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowHoursModal(false)}
                  className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm 
                 hover:bg-white/30 text-blue-600 rounded-full p-2.5 
                 transition-all duration-300 hover:rotate-90 hover:scale-110"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-gray-50/50 to-white">
                {location?.dateTimeSlots?.length > 0 ? (
                  <div className="space-y-6">
                    {[...location.dateTimeSlots]
                      .sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate)
                      )
                      .map((slot, index) => (
                        <motion.div
                          key={slot.dateTimeID}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {/* Date Range Header */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-8 bg-gradient-to-b from-[#005EB8] to-[#0078D4] rounded-full"></div>
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  Schedule Period
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(slot.startDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                  -{" "}
                                  {new Date(slot.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Weekly Schedule Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(slot.weeklySchedule || {})
                              .filter(
                                ([, times]) =>
                                  Array.isArray(times) && times.length > 0
                              )
                              .map(([day, times]) => (
                                <div
                                  key={day}
                                  className="bg-gradient-to-br from-white to-gray-50/80 border border-gray-200/50 
                               rounded-xl p-4 hover:shadow-md transition-all duration-300"
                                >
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 bg-[#005EB8] rounded-full"></div>
                                    <span className="font-semibold text-gray-900 capitalize text-sm">
                                      {day}
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {times.map((timeSlot, i) => {
                                      const start =
                                        timeSlot.startTime ||
                                        timeSlot.start_time ||
                                        timeSlot.start;
                                      const end =
                                        timeSlot.endTime ||
                                        timeSlot.end_time ||
                                        timeSlot.end;
                                      const breakStart =
                                        timeSlot.exceptionStartTime ||
                                        timeSlot.exception_start_time;
                                      const breakEnd =
                                        timeSlot.exceptionEndTime ||
                                        timeSlot.exception_end_time;

                                      return (
                                        <div key={i} className="space-y-1">
                                          {/* Main Hours */}
                                          <div className="flex items-center justify-between bg-blue-50/70 rounded-lg p-2">
                                            <span className="text-sm font-medium text-gray-800">
                                              {start
                                                ? start.slice(0, 5)
                                                : "N/A"}{" "}
                                              - {end ? end.slice(0, 5) : "N/A"}
                                            </span>
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                          </div>

                                          {/* Break Time */}
                                          {breakStart &&
                                            breakEnd &&
                                            breakStart !== null &&
                                            breakEnd !== null && (
                                              <div className="flex items-center justify-between bg-orange-50/70 rounded-lg p-2 ml-2">
                                                <span className="text-xs text-orange-700 italic">
                                                  Closed:{" "}
                                                  {breakStart.slice(0, 5)} -{" "}
                                                  {breakEnd.slice(0, 5)}
                                                </span>
                                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                              </div>
                                            )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                          </div>

                          {/* Exception Dates */}
                          {slot.exceptionDates?.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-gray-200/50">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <p className="text-sm font-semibold text-red-700">
                                  Closed Dates
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {slot.exceptionDates.map((ex, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50/80 
                                 text-red-700 rounded-full border border-red-200/50 text-xs font-medium"
                                  >
                                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                    {new Date(ex.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg mb-2">
                      No operating hours available
                    </p>
                    <p className="text-gray-500 text-sm">
                      Please contact the clinic directly for schedule
                      information.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50 px-8 py-4">
                <p className="text-xs text-gray-500 text-center">
                  Operating hours are subject to change. Please call ahead to
                  confirm availability.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CardView;
