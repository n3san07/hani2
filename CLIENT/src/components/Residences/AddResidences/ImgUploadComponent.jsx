import React, { useEffect, useRef, useState } from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImgUploadComponent = ({ handleBack, handleNext, setPropertyDetails }) => {
  const [ImageURL, setImageURL] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dxfc1owsn",
        uploadPreset: "ofwwpdqg",
        maxFiles: 3,
        resourceType: "image",
        quality: 50, // Adjust quality (0-100)
        transformation: [
          { width: 800, height: 600, crop: "fill" },
          { format: "jpeg" } // Adjust width and height
        ],
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
  }, []);

  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? ImageURL.length - 1 : prev - 1));
  };

  const next = () => {
    setPropertyDetails((prev) => ({ ...prev, imgsUrl: ImageURL || [] }));
    handleNext();
  };

  const renderButtons = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button disabled={ImageURL.length == 0} onClick={next}>Next </Button>
      </Box>
    );
  };

  return (
    <>
      {ImageURL.length == 0 ? (
        <>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              maxWidth: "300px",
              margin: "auto",
              mt: "4vh",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Upload Your Photo
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              onClick={() => widgetRef.current?.open()}
            />
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ marginBottom: 2 }}
              >
                Choose File
              </Button>
            </label>
          </Paper>
          {renderButtons()}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "4vh",
          }}
        >
          <Typography variant="body1" color="initial">
            click on the img to preview all{" "}
          </Typography>
          <Paper elevation={3} sx={{ maxWidth: 400 }}>
            <img
            loading="lazy"
              width="400px"
              height="400px"
              src={ImageURL[currentImage]}
              style={{ maxWidth: "100%", height: "auto" }}
              onClick={prevImage}
            />
          </Paper>
          {renderButtons()}
        </Box>
      )}
    </>
  );
};

export default ImgUploadComponent;
