import React, { useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import NotFound from "../../errorPage/Error";
import { Grid, Button, Box, Typography, Paper } from "@mui/material";
import CardComp from "../../card/CardComp";
import { getMyR } from "../../../hooks/UseProperties";
import { toast } from "react-toastify";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "../../../context/UserDetailsContext";
import Loading from "../../../providers/Loading";
import { useModel } from "../AddResidences/AddResidencesModel";
const MyResidences = () => {
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  const { handelToggleModel, handleOpen } = useModel();
  if (!UserDetails) {
    return <Loading />;
  }
  const [email, setemail] = useState(UserDetails?.Email);

  const nav = useNavigate();

  const { data, isError, isLoading, refetch } = getMyR(email);

  // Conditionally render components after hooks
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  const isDataEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (isDataEmpty) {
    toast.warn("start selling");
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <Box variant="h5" sx={{ mb: 2 }}>
          No Data Found
        </Box>
        <Typography variant="body1">
          Sorry, there is no data available at the moment.
        </Typography>
        <Button
          onClick={() => {
            nav(`/${ROUTES.RESIDENCES}`);
          }}
          sx={{ mt: 10 }}
          variant="contained"
        >
          Let Me Get Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Paper sx={{minHeight:"72vh"}} alignItems="center" >
        <Grid alignItems="center" container spacing={2}>
          {data?.map((card) => (
            <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
              <CardComp card={card} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default MyResidences;
