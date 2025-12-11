import React, { useEffect, useState } from "react";
import { Car, Accessibility, Toilet, Clock, X } from "lucide-react";
import GoogleMapComponent from "@/components/GoogleMap/GoogleMapComponent";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ClinicCard = ({
  clinic,
  location,
  locationDistance = null,
  selectedVaccines,
  postCode,
  specialConditions,
}) => {
  const navigate = useNavigate();
  const [showHours, setShowHours] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  return (
    <div className="flex-1 min-w-[300px] max-w-[500px] h-[600px] bg-white rounded-2xl shadow-lg overflow-visible flex flex-col">
      {/* Top Images */}
      <div className="flex gap-3 p-4">
        {/* Image */}
        <div className="flex-1 max-w-[600px] h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 border border-gray-300 shadow-sm overflow-hidden">
          {clinic?.clinicImageUrl ? (
            <img
              src={clinic.clinicImageUrl}
              alt={clinic.clinicName}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="w-full text-center">Hospital Image</span>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 max-w-[600px]  h-40 rounded-lg border border-gray-300 shadow-sm overflow-hidden">
          <GoogleMapComponent
            apiKey={import.meta.env.VITE_GOOGLE_LOCATION_API}
            longitude={location?.longitude}
            latitude={location?.latitude}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {clinic?.clinicName}
          </h2>
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {locationDistance !== null && locationDistance !== undefined
              ? `${locationDistance} miles away`
              : "Distance unknown"}
          </span>
        </div>

        {/* Location Address */}
        <p className="text-sm text-gray-600 leading-5 line-clamp-2  h-[40px]">
          {location.addressLine1}
          {location.addressLine2 && `, ${location.addressLine2}`},{" "}
          {location.townCity}, {location.postcode}, {location.country}
        </p>

        {/* Toggle Hours */}
        <button
          onClick={() => setShowHoursModal(true)}
          className="text-sm text-[#005EB8] font-medium flex items-center gap-1 hover:underline"
        >
          <Clock className="w-4 h-4" />
          Show operating hours
        </button>

        {/* Operating Hours  */}
        {showHours && location && (
          <div className="relative mt-2">
            <div className="text-gray-700 ml-8 pr-8 space-y-4 max-h-40 overflow-y-auto">
              {location.dateTimeSlots?.length > 0 ? (
                location.dateTimeSlots.map((slot) => (
                  <div
                    key={slot.dateTimeID}
                    className="border rounded-lg p-3 bg-gray-50 shadow-sm"
                  >
                    {/* Date Range */}
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {new Date(slot.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(slot.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    {/* Weekly Schedule */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(slot.weeklySchedule || {})
                        .filter(
                          ([day, times]) =>
                            Array.isArray(times) && times.length > 0
                        )
                        .map(([day, times]) => (
                          <div key={day} className="flex flex-col">
                            <span className="font-medium capitalize">
                              {day}
                            </span>

                            {times.map((timeSlot, i) => {
                              const start =
                                timeSlot.startTime ||
                                timeSlot.start_time ||
                                timeSlot.start;
                              const end =
                                timeSlot.endTime ||
                                timeSlot.end_time ||
                                timeSlot.end;

                              // Fixed: Check for non-null values
                              const breakStart =
                                timeSlot.exceptionStartTime ||
                                timeSlot.exception_start_time;
                              const breakEnd =
                                timeSlot.exceptionEndTime ||
                                timeSlot.exception_end_time;

                              return (
                                <div key={i} className="ml-2">
                                  {/* Normal Hours */}
                                  <span className="block text-gray-600">
                                    {start ? start.slice(0, 5) : "N/A"} -{" "}
                                    {end ? end.slice(0, 5) : "N/A"}
                                  </span>

                                  {/* Break Time - Fixed condition */}
                                  {breakStart &&
                                    breakEnd &&
                                    breakStart !== null &&
                                    breakEnd !== null && (
                                      <span className="block text-xs text-orange-600 italic">
                                        Break: {breakStart.slice(0, 5)} -{" "}
                                        {breakEnd.slice(0, 5)}
                                      </span>
                                    )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                    </div>

                    {/* Exception Dates */}
                    {slot.exceptionDates &&
                      Array.isArray(slot.exceptionDates) &&
                      slot.exceptionDates.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-red-600 mb-1">
                            Closed on:
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            {slot.exceptionDates.map((ex, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-red-50 rounded-full border border-red-100"
                              >
                                {new Date(ex.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No operating hours available for this location.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Vaccines */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-medium text-gray-900 whitespace-nowrap">
            Available Vaccines:
          </h3>
          {clinic.relatedVaccinationTypes
            ?.slice()
            .sort((a, b) =>
              selectedVaccines.includes(a.vaccinationTypeID)
                ? -1
                : selectedVaccines.includes(b.vaccinationTypeID)
                ? 1
                : 0
            )
            .map((vaccine) => {
              const isSelected = selectedVaccines.includes(
                vaccine.vaccinationTypeID
              );

              return (
                <span
                  key={vaccine.vaccinationTypeID}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isSelected
                      ? "bg-blue-100 text-[#005EB8]"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {vaccine.name}
                </span>
              );
            })}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 h-[100px] border border-gray-200 rounded-lg p-3 overflow-y-auto">
          <p className="text-sm text-gray-700">
            {location.additionalInformation}
          </p>
        </div>
      </div>

      {/* Icons + Button */}
      <div className="px-4 pb-4">
        <div className="flex justify-end gap-3 text-[#D3979B] mb-3">
          {location.onSiteFreeParking && (
            <div className="relative group">
              <Car className="w-8 h-8" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {" "}
                Free Parking
              </span>
            </div>
          )}

          {location.disabledAccess && (
            <div className="relative group">
              <Accessibility className="w-8 h-8" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Disabled Access
              </span>
            </div>
          )}

          {location.toilets && (
            <div className="relative group">
              <Toilet className="w-8 h-8" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Toilets Available
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-[#D3979B] text-white font-semibold py-2 rounded-lg hover:bg-[#AB787B] transition"
            onClick={() => setShowPhone(true)}
          >
            {showPhone ? clinic?.telephone || "No phone number" : "Contact"}
          </button>
          <button
            className="flex-1 bg-[#D3979B] text-white font-semibold py-2 rounded-lg hover:bg-[#AB787B] transition"
            onClick={() => {
              navigate(`/clinic-LocationView/${location?.locationID}`, {
                state: {
                  clinic,
                  location,
                  locationDistance,
                  postCode,
                  specialConditions,
                },
              });
            }}
          >
            View
          </button>
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
    </div>
  );
};

export default ClinicCard;
