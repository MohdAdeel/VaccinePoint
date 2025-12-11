import Loader from "../Loader/Loader";
import ClinicCard from "./ClinicCard";
import React, { useRef, useState, useEffect } from "react";

const ClinicCarousel = ({
  searchedData,
  selectedVaccines,
  postCode,
  distanceFilter = 150,
  specialConditions,
}) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [showNoClinicMsg, setShowNoClinicMsg] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    function updateCardsPerView() {
      const w = window.innerWidth;
      if (w < 640) setCardsPerView(1); // phones
      else if (w < 1024) setCardsPerView(2); // tablets / small laptops
      else setCardsPerView(4); // desktop
    }
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  function getDistanceMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async function geocodePostcode(postcode) {
    if (!postcode) return null;

    const fallbackStatuses = [429, 500, 503]; // 429 = too many requests 500 = server error 503 = service unavailable
    let postcodeStatus = null;

    // -------------------------------
    // Try Postcodes.io First
    // -------------------------------
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
      );

      const data = await res.json();
      postcodeStatus = data.status;

      if (data.status === 200 && data.result) {
        return {
          lat: data.result.latitude,
          lng: data.result.longitude,
          source: "postcodes.io",
        };
      }
    } catch (err) {
      console.error("Postcodes.io error:", err);
      postcodeStatus = 500;
    }

    if (!fallbackStatuses.includes(postcodeStatus)) {
      console.warn(
        "Not falling back to Google. Postcode.io status was:",
        postcodeStatus
      );
      return null;
    }
    return null;
  }

  async function getUserCoords(allLocations, userPostcode) {
    const norm = userPostcode.replace(/\s+/g, "").toUpperCase();

    let match = allLocations.find(
      (loc) =>
        loc.postcode && loc.postcode.replace(/\s+/g, "").toUpperCase() === norm
    );

    if (match) {
      return { lat: Number(match.latitude), lng: Number(match.longitude) };
    }

    const coords = await geocodePostcode(userPostcode);
    if (coords) return coords;

    throw new Error("Unable to determine coordinates for user postcode");
  }

  useEffect(() => {
    let cancelled = false;
    async function process() {
      try {
        const flatClinics = searchedData.flatMap((clinic) =>
          (clinic.locations || []).map((location) => ({ clinic, location }))
        );
        const allLocations = searchedData.flatMap((c) => c.locations || []);
        const userCoords = await getUserCoords(allLocations, postCode);
        const withDistances = flatClinics.map(({ clinic, location }) => {
          const locLat = Number(location.latitude);
          const locLon = Number(location.longitude);

          if (Number.isFinite(locLat) && Number.isFinite(locLon)) {
            const d = getDistanceMiles(
              userCoords.lat,
              userCoords.lng,
              locLat,
              locLon
            );

            return {
              clinic,
              location,
              distance: Number(Math.round(d * 10) / 10),
            };
          }
          return { clinic, location, distance: Infinity };
        });

        withDistances.sort((a, b) => a.distance - b.distance);

        const filtered = withDistances.filter(
          (it) => it.distance <= Number(distanceFilter)
        );

        if (!cancelled) {
          setItems(filtered);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Error processing clinics:", err);
        if (!cancelled) {
          setItems([]);
          setCurrentIndex(0);
        }
      }
    }

    process();
    return () => (cancelled = true);
  }, [postCode]);

  const groupedClinics = [];
  for (let i = 0; i < items.length; i += cardsPerView) {
    groupedClinics.push(items.slice(i, i + cardsPerView));
  }
  const gridClassForCards = () => {
    if (cardsPerView === 1) return "grid-cols-1";
    if (cardsPerView === 2) return "grid-cols-2";
    return "grid-cols-2 grid-rows-2";
  };

  const scrollToIndex = (newIndex) => {
    const container = containerRef.current;
    if (!container) return;
    const firstSlide = container.querySelector(".slide");
    if (!firstSlide) return;
    const slideWidth = firstSlide.offsetWidth;
    container.scrollTo({ left: newIndex * slideWidth, behavior: "smooth" });
    setCurrentIndex(newIndex);
  };

  const nextCard = () => {
    const maxIndex = groupedClinics.length - 1;
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    let timer;
    if (items.length === 0) {
      timer = setTimeout(() => {
        setShowNoClinicMsg(true);
      }, 5000);
    } else {
      setShowNoClinicMsg(false);
    }
    return () => clearTimeout(timer);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[70vh]">
        {showNoClinicMsg ? (
          <p className="text-gray-700 text-center">
            No clinics found within {distanceFilter} miles of{" "}
            {postCode || "your location"}.
          </p>
        ) : (
          <Loader />
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="overflow-x-hidden w-full max-w-full sm:max-w-[65rem] mb-5"
      >
        <div className="flex track">
          {groupedClinics.map((group, idx) => (
            <div
              key={idx}
              className={`slide flex-none w-full grid gap-4 p-2 ${gridClassForCards()}`}
            >
              {group.map(({ clinic, location, distance }) => (
                <ClinicCard
                  key={location.locationID}
                  clinic={clinic}
                  location={location}
                  locationDistance={distance}
                  selectedVaccines={selectedVaccines}
                  postCode={postCode}
                  specialConditions={specialConditions}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {groupedClinics.length > 1 && (
        <div className="flex gap-2 justify-end w-full max-w-full sm:max-w-[65rem] my-6 px-2">
          <button
            onClick={() => {
              if (currentIndex > 0) scrollToIndex(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="bg-white shadow-md rounded-lg px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 border border-gray-200"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentIndex < groupedClinics.length - 1)
                scrollToIndex(currentIndex + 1);
            }}
            disabled={currentIndex >= groupedClinics.length - 1}
            className="bg-white shadow-md rounded-lg px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 border border-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicCarousel;
