import React, { useContext, useEffect, useState } from "react";
import NotFound from "../../errorPage/Error";
import { Grid, Button, Box, Typography,Paper } from "@mui/material";
import CardComp from "../../card/CardComp";
import { getAllF, checkLikeP } from "../../../hooks/UseProperties";
import { toast } from "react-toastify";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "../../../context/UserDetailsContext";
import Loading from "../../../providers/Loading";
const FavoriteResidences = () => {
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  if (!UserDetails) {
    return <Loading />;
  }
  const [email, setemail] = useState(UserDetails?.Email);

  const nav = useNavigate();

  const { data, isError, isLoading, refetch } = getAllF(email);
  const [likedIDarray, setlikedIDarray] = useState(null);

  const resevLikedDataAndSet = async () => {
    const res = await checkLikeP(UserDetails?.Email);
    setlikedIDarray(res);
  };

  useEffect(() => {
    if (UserDetails?.Email) {
      resevLikedDataAndSet();
    }
  }, [UserDetails, setUserDetails]);

  // Conditionally render components after hooks
  if (isLoading) {
    return <Loading />;
  }
  const isDataEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (isError) {
    return <NotFound />;
  }

  if (isDataEmpty) {
    toast.warn("you dont have any favorites");
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
      <Paper sx={{minHeight:"72vh"}} alignItems="center" textAlign="center">
        <Grid alignItems="center" container spacing={2}>
          {data?.map((card) => (
            <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
              <CardComp likedIDarray={likedIDarray} card={card} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default FavoriteResidences;
