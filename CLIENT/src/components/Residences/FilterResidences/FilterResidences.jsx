import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import NotFound from "../../errorPage/Error";
import { Grid, Button, Box, Pagination, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import FilterSlider from "../../FilterSlider/FilterSlider";
import CardComp from "../../card/CardComp";
import { getFillterd } from "../../../hooks/UseProperties";
import { ToastContainer, toast } from "react-toastify";
import ROUTES from "../../../routes/routesModel";
const FilterResidences = () => {
  const [search, setSearch] = useSearchParams();
  const UrlQueryPrice = search.get("price") || "";
  const UrlQueryCity = search.get("city") || "";
  const UrlQuerystate = search.get("state") || "";
  const nav = useNavigate();
  const { data, isError, isLoading, refetch } = getFillterd(
    UrlQueryPrice,
    UrlQueryCity,
    UrlQuerystate
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isLoading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "80vh" }}
      >
        <Grid item xs={3}>
          <RingLoader color="#ff9e45" size={300} />
        </Grid>
      </Grid>
    );
  }
  if (isError) {
    return <NotFound />;
  }
  const isDataEmpty = !data || (Array.isArray(data) && data.length === 0);
  if (isDataEmpty) {
    toast.warn("no data available");
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
         <Box textAlign="right" sx={{ padding: 2 }}>
        <Button onClick={toggleDrawer} variant="contained" color="warning">
          Filter
        </Button>
        <FilterSlider
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      </Box>
      <Box alignItems="center" textAlign="center">
        <Grid alignItems="center" container spacing={2}>
          {data?.map((card) => (
            <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
              <CardComp card={card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

FilterResidences.propTypes = {};

export default FilterResidences;
