import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { Typography } from "@mui/joy";
import MyGoogleMap from "../../MyGoogleMap/MyGoogleMap";
const LocationComponent = ({
  handleNext,
  setPropertyDetails,
  PropertyDetails,
}) => {
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([
            position.coords.latitude,
            position.coords.longitude,
            16,
          ]);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const next = () => {
    setPropertyDetails((prev) => ({ ...prev, MapPosition: location || [] }));
    handleNext();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: "24px", marginBottom: "16px" }}>
        Get Your Location
      </Typography>
      <Typography sx={{ fontSize: "13px", marginBottom: "16px" }}>
        Because the Streets on the Palestinian side not working correctly We
        recommend getting the current site of the properties
      </Typography>
      {location ? (
        <Box>
          <MyGoogleMap MapPosition={location} />
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetLocation}
          sx={{ width: "200px" }}
        >
          Get My Location
        </Button>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button disabled={!location} onClick={next}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LocationComponent;
