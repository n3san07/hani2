import React, { useCallback, useContext, useEffect, useState } from "react";
import { getallP, checkLikeP } from "../../hooks/UseProperties";
import NotFound from "../errorPage/Error";
import Loading from "../../providers/Loading";
import { Grid, Button, Box, Pagination,Paper } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import FilterSlider from "../FilterSlider/FilterSlider";
import CardComp from "../card/CardComp";
import UserDetailsContext from "../../context/UserDetailsContext";
const Residences = () => {
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  const [likedIDarray, setlikedIDarray] = useState(null);
  const { data, isError, isLoading, refetch } = getallP();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((event, page) => {
    setCurrentPage(page);
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex);

  const resevLikedDataAndSet = async () => {
    const res = await checkLikeP(UserDetails?.Email);
    setlikedIDarray(res);
  };

  useEffect(() => {
    if (UserDetails?.Email) {
      resevLikedDataAndSet();
    }
  }, [UserDetails, setUserDetails]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFound />;
  }


  return (
    <Paper sx={{minHeight:"72vh"}}>
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
      <AnimatePresence>
        <Box alignItems="center" textAlign="center">
          <Grid alignItems="center" container spacing={2}>
            {paginatedData.map((card) => (
              <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
                <CardComp likedIDarray={likedIDarray} card={card} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </AnimatePresence>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Paper>
  );
};

export default Residences;
