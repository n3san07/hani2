import React, { useContext } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { Grid, Paper, Typography, Container } from "@mui/material";
import AppWidgetSummary from "./AppWidgetSummary";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DataTable from "./AdminTable";
import { AdminData } from "../../hooks/UseProperties";
import Loading from "../../providers/Loading";
import NotFound from "../errorPage/Error";
const AdminDashboard = () => {
  const { UserDetails } = useContext(UserDetailsContext);
  if (!UserDetails.Email) {
    return <h1>NO EMAIL FOUND </h1>;
  }
  const { data, isError, isLoading, refetch } = AdminData(UserDetails?.Email);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFound />;
  }

  const styles = {
    container: {
      padding: "10px", // Default padding for larger screens
      maxWidth: "md",
    },
    paper: {
      elevation: 8,
      padding: "10px", // Default padding for larger screens
    },
    // Media query for screens with a maximum width of 600px (phones)
    "@media (max-width: 600px)": {
      container: {
        padding: "20px", // Increased padding for phones
      },
      paper: {
        elevation: 16,
        padding: "20px", // Increased padding for phones
      },
    },
  };

  return (
    <>
      <Paper sx={{ minHeight: "72vh" }} elevation={2}>
        <Typography
          sx={{ p: 2, fontSize: "6vw" }}
          fontFamily="fantasy"
          variant="h2"
        >
          welcom &nbsp;
          <span style={{ color: "#FF9E45", fontFamily: "fantasy" }}>
            &nbsp;{UserDetails?.Name} &nbsp;
          </span>
        </Typography>
        <br />
        <Grid justifyContent="center" container spacing={3}>
          <Grid item xs={12} sm={6} md={5}>
            <AppWidgetSummary
              title="Residencies"
              total={data?.PropertiesCount}
              icon={<HomeIcon width={24} height={24} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <AppWidgetSummary
              title="Users"
              total={data?.UsersCount}
              icon={<PeopleAltIcon width={24} height={24} />}
            />
          </Grid>
        </Grid>
        <Container sx={{ ...styles.container, paddingTop: 6 }} maxWidth="md">
          <Paper sx={{ ...styles.paper }}>
            <DataTable Users={data?.Users} />
          </Paper>
        </Container>
      </Paper>
    </>
  );
};

export default AdminDashboard;
