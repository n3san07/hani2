import React from "react";
import { RingLoader } from "react-spinners";
import { Grid, Paper } from "@mui/material";

const Loading = () => {
  return (
    <Paper>
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
    </Paper>
  );
};

export default Loading;
