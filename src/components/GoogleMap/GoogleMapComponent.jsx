import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapComponent = ({ longitude, latitude, apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) return <div>Loading map...</div>;
  if (!location)
    return (
      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Loading location...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{ lat: latitude, lng: longitude }}
      zoom={14}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
