import React from "react";
import { CardActionArea, Box, CardMedia, Chip } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import ReadMoreTypography from "../../hooks/ReadMoreTypography.jsx";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel.js";

const ActionAreaCopm = ({ card }) => {
  const nav = useNavigate();

  console.log(card);
  return (
    <>
      <CardActionArea
        onClick={() => {
          nav(`/${ROUTES.RESIDENCES}/${card._id}`);
        }}
      >
        <CardMedia
          loading="eager"
          alt={card?.title}
          component="img"
          height="190px"
          image={
            card.imgsUrl[0] ||
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />

        <Box
          sx={{
            gap: 2,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Chip variant="outlined" icon={<RoomIcon />} label={card.city} />
            <Chip
              variant="outlined"
              icon={
                <span style={{ fontSize: "20px", color: "#ff9e45" }}>
                  &#8362;
                </span>
              }
              label={card.price}
            />
          </Box>
          <ReadMoreTypography
            text={card.info}
            maxChars={80}
          ></ReadMoreTypography>
        </Box>
      </CardActionArea>
    </>
  );
};

export default ActionAreaCopm;
