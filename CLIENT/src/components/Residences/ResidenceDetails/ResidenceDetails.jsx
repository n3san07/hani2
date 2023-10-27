import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import NotFound from "../../errorPage/Error";
import Loading from "../../../providers/Loading";
import { getSingleP } from "../../../hooks/UseProperties";
import Slideshow from "../../Slideshow/Slideshow";
import CallIcon from "@mui/icons-material/Call";
import {
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import HotelIcon from "@mui/icons-material/Hotel";
import ShowerIcon from "@mui/icons-material/Shower";
import MyGoogleMap from "../../MyGoogleMap/MyGoogleMap";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UserDetailsContext from "../../../context/UserDetailsContext";
import BioCard from "../../../providers/BioCard";
import { getInfo } from "../../../services/api";
const ResidenceDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading, refetch } = getSingleP(id);
  const { UserDetails } = useContext(UserDetailsContext);
  const [info, setinfo] = useState();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  const getSellerInfo = async () => {
    if (UserDetails) {
      try {
        return await getInfo(data?.owner).then((res) => {
          setinfo(res.user);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!info) {
    getSellerInfo();
  }
  return (
    <>
      <Paper>
        <Slideshow
          key={data?.imgsUrl}
          sx={{
            flex: 1,
          }}
          imgsUrl={data?.imgsUrl || []}
        />
      </Paper>
      <Paper>
        <Container
          sx={{ paddingTop: "3rem", paddingBottom: "3rem", color: "#5a5a5a" }}
        >
          <Grid container spacing={3}>
            {/* First Column */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{ padding: "1.3rem", textAlign: "center" }}
              >
                <SquareFootIcon sx={{ fontSize: 100, color: "#ff9e45" }} />
                <Typography variant="h3">{data?.facilities.size}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{ padding: "1.3rem", textAlign: "center" }}
              >
                <HotelIcon sx={{ fontSize: 100, color: "#ff9e45" }} />
                <Typography variant="h3">{data?.facilities.bedRoom}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{ padding: "1.3rem", textAlign: "center" }}
              >
                <LocalParkingIcon sx={{ fontSize: 100, color: "#ff9e45" }} />
                <Typography variant="h3">{data?.facilities.parking}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{ padding: "1.3rem", textAlign: "center" }}
              >
                <ShowerIcon sx={{ fontSize: 100, color: "#ff9e45" }} />
                <Typography variant="h3">
                  {data?.facilities.bathRoom}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ margin: "5rem 0" }} />

          <Grid container spacing={5}>
            {/* Featurette 1 */}
            <Grid item xs={12} md={7}>
              <Typography variant="h2" sx={{ fontWeight: 300 }}>
                {data?.title}
                <br />
                <Box>
                  <LocationOnIcon
                    sx={{ color: "#ff9e45" }}
                    fontSize="inherit"
                  />
                  <span className="text-muted">{`${data.city} , ${data.street}`}</span>
                </Box>
              </Typography>
              <Typography variant="h3" sx={{ marginTop: "1rem" }}>
                {data?.info}
              </Typography>

              <Typography variant="h2" sx={{ marginTop: "3rem" }}>
                <Box sx={{ color: "#ff9e45" }} component={"span"}>
                  ₪
                </Box>
                {Intl.NumberFormat().format(data?.price)}
              </Typography>
              {data?.flexiblePrice && (
                <Box sx={{ color: "#ff9e45" }} component={"span"}>
                  Flexible Price
                </Box>
              )}

              {UserDetails ? (
                <Box sx={{ mt: "4rem" }}>
                  <Button
                    size="large"
                    variant="outlined"
                    href={`tel:0${data?.phone}`}
                    component={"a"}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32, mr: 2 }}
                      alt={info?.Name}
                      src={
                        info?.Picture ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                    />
                    &nbsp;&nbsp; {data?.ownerName}{" "}
                  </Button>
                </Box>
              ) : (
                <Typography sx={{ mt: "4rem" }} variant="body1" color="#ff9e45">
                  join Us For seller Details
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", textAlign: "center" }}
              >
                <MyGoogleMap
                  MapStyle={{ maxWidth: "500px", height: "500px" }}
                  MapPosition={data?.MapPosition}
                />
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ margin: "5rem 0" }} />
        </Container>
      </Paper>
    </>
  );
};

ResidenceDetails.propTypes = {};

export default ResidenceDetails;
