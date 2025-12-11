import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const AdvanceFilterContext = createContext();

export const AdvanceFilterProvider = ({ children }) => {
  const location = useLocation();
  const [postCode, setPostCode] = useState("");
  const [DOB, setDOB] = useState("");
  const [selectedVaccines, setSelectedVaccines] = useState("");
  const [availability, setAvailability] = useState("");
  const [customDates, setCustomDates] = useState({ from: "", to: "" });
  const [accessibility, setAccessibility] = useState([]);
  const [specialConditions, setSpecialConditions] = useState({
    chronicRespiratoryDisease: null,
    immunosuppression: null,
    chronicHeartDisease: null,
    chronicKidneyLiverDigestive: null,
    chronicNeurologicalDisease: null,
    endocrineDisorders: null,
    aspleniaOrSpleenDysfunction: null,
    morbidObesity: null,
    severeMentalIllness: null,
    Pregnancy: null,
    seriousGeneticAbnormalities: null,
    learningDisability: null,
  });

  useEffect(() => {
    localStorage.setItem(
      "advanceFilter",
      JSON.stringify({
        postCode,
        DOB,
        selectedVaccines,
        availability,
        customDates,
        accessibility,
        specialConditions,
      })
    );
  }, [
    postCode,
    DOB,
    selectedVaccines,
    availability,
    customDates,
    accessibility,
    specialConditions,
  ]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("advanceFilter"));
    if (saved) {
      setPostCode(saved.postCode || "");
      setDOB(saved.DOB || "");
      setSelectedVaccines(saved.selectedVaccines || "");
      setAvailability(saved.availability || "");
      setCustomDates(saved.customDates || { from: "", to: "" });
      setAccessibility(saved.accessibility || []);
      setSpecialConditions(saved.specialConditions || {});
    }
  }, []);

  const preserveStateRoutes = [
    "/findImmunisationServices",
    "/clinic-LocationView",
  ];

  // Reset state when navigating away from protected routes
  useEffect(() => {
    const shouldPreserveState = preserveStateRoutes.some((route) =>
      location.pathname.includes(route)
    );

    if (!shouldPreserveState) {
      resetFilters();
    }
  }, [location.pathname]);

  // Helper function to reset all filters
  const resetFilters = () => {
    setPostCode("");
    setDOB("");
    setSelectedVaccines("");
    setAvailability("");
    setCustomDates({ from: "", to: "" });
    setAccessibility([]);
    setSpecialConditions({
      chronicRespiratoryDisease: null,
      immunosuppression: null,
      chronicHeartDisease: null,
      chronicKidneyLiverDigestive: null,
      chronicNeurologicalDisease: null,
      endocrineDisorders: null,
      aspleniaOrSpleenDysfunction: null,
      morbidObesity: null,
      severeMentalIllness: null,
      Pregnancy: null,
      seriousGeneticAbnormalities: null,
      learningDisability: null,
    });
  };

  return (
    <AdvanceFilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </AdvanceFilterContext.Provider>
  );
};

export const useAdvanceFilter = () => useContext(AdvanceFilterContext);
