import React, { useContext, useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import HotelIcon from "@mui/icons-material/Hotel";
import ShowerIcon from "@mui/icons-material/Shower";
import { useNavigate } from "react-router-dom";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import EditIcon from "@mui/icons-material/Edit";
import UserDetailsContext from "../../context/UserDetailsContext";
import ROUTES from "../../routes/routesModel";
import { likeP } from "../../hooks/UseProperties";
const CardButtonComp = ({ likedIDarray, card }) => {
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  const nav = useNavigate();

  const [isLiked, setisLiked] = useState(false);
  useEffect(() => {
    if (likedIDarray?.includes(card._id)) {
      setisLiked(true);
    }
  }, [setisLiked, likedIDarray]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          boxSizing: "content-box",
          padding: 3,
          fontSize: "1.125rem",
        }}
      >
        <Chip
          size="small"
          icon={<LocalParkingIcon />}
          label={card.facilities.parking}
        />
        <Chip
          size="small"
          icon={<HotelIcon />}
          label={card.facilities.bedRoom}
        />
        <Chip
          size="small"
          icon={<ShowerIcon />}
          label={card.facilities.bathRoom}
        />
        {UserDetails && (
          <span>
            {" "}
            {isLiked ? (
              <FavoriteSharpIcon
                sx={{ color: "rgb(244,67,54)" }}
                onClick={() => {
                  likeP(card?._id, UserDetails?.Email);
                  setisLiked(!isLiked);
                }}
              />
            ) : (
              <FavoriteSharpIcon
                onClick={() => {
                  likeP(card?._id, UserDetails?.Email);
                  setisLiked(!isLiked);
                }}
              />
            )}{" "}
          </span>
        )}
        {UserDetails?.Email == card?.owner ? (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              nav(`${ROUTES.EDITRESIDENCES}/${card._id}`);
            }}
          />
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default CardButtonComp;
