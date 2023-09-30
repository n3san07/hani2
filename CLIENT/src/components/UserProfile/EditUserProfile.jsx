import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Box,
  Container,
  Divider,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserDetailsContext from "../../context/UserDetailsContext";
import { UseEditUserData } from "../../hooks/UseUser";
const EditUserProfile = () => {
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  console.log(UserDetails);

  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched", // Validate on input touched
    defaultValues: {
      Name: UserDetails?.Name || "b",
      Email: UserDetails?.Email || "b",
      Address: UserDetails?.Address || "b",
      AboutMe: UserDetails?.AboutMe || "b",
      Phone: UserDetails?.Phone || "b",
      Picture: UserDetails?.Picture || "https://via.placeholder.com/150",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  // stil not workking
  const onSubmit = async (data) => {
    console.log(data);
    const res = await UseEditUserData(data);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      reset();
    }
  };

  return (
    <Paper sx={{ minHeight: "70vh" }}>
      <Container maxWidth="xl">
        <AppBar color="primary" position="static" sx={{ marginBottom: "20px" }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              User Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{ padding: "20px", position: "relative" }}
              >
                <Controller
                  name="Picture"
                  control={control}
                  defaultValue="John"
                  render={({ field }) => (
                    <Avatar
                      {...field}
                      alt={UserDetails?.Name}
                      sx={{ width: 150, height: 150, margin: "0 auto 20px" }}
                    />
                  )}
                />
                {!isEditing && (
                  <IconButton
                    onClick={toggleEdit}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <Typography variant="h6" gutterBottom>
                  Contact Info
                </Typography>
                <Controller
                  name="Name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="name"
                      required
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="Phone"
                  control={control}
                  defaultValue="0522613459"
                  rules={{ required: "Phone is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="Email"
                  control={control}
                  defaultValue={UserDetails?.Email || ""}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                    />
                  )}
                />
                {isEditing && (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: "20px" }}
                  >
                    Save
                  </Button>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <Controller
                  name="AboutMe"
                  control={control}
                  defaultValue="I'm a software developer."
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="About Me"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                    />
                  )}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Addres
                </Typography>
                <Controller
                  name="Address"
                  control={control}
                  defaultValue="I'm a software developer."
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                    />
                  )}
                />

                <Divider sx={{ my: 2 }} />
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export default EditUserProfile;
