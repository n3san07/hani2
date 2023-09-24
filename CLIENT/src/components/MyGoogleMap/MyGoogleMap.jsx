import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Loading from "../../providers/Loading";
import { Box } from "@mui/material";
const MyGoogleMap = ({ MapPosition }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });
  if (!isLoaded) {
    return <Loading />;
  }

  return (
          <GoogleMap
      mapContainerStyle={{ minWidth: "500px", height: "500px" }}
      zoom={MapPosition[2] || 9 }
      center={{
        lat: MapPosition[0] || 50,
        lng: MapPosition[1] || 50
      }}
    >
      <Marker position={{
    lat: MapPosition[0] || 50,
    lng: MapPosition[1] || 50
  }} />
    </GoogleMap>
  );
};


export default MyGoogleMap;
