import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const EditUserProfile = () => {
  const nav = useNavigate();
  const { UserDetails, setUserDetails } = useContext(UserDetailsContext);
  const [img, setimg] = useState(
    UserDetails?.Picture ||
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
  );

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dxfc1owsn",
        uploadPreset: "ofwwpdqg",
        maxFiles: 3,
      },
      (err, result) => {
        if (result.event === "success") {
          setimg(result.info.secure_url);
        }
      }
    );
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched", // Validate on input touched
    defaultValues: {
      Name: UserDetails?.Name || "",
      Email: UserDetails?.Email || "",
      Address: UserDetails?.Address || "",
      AboutMe: UserDetails?.AboutMe || "",
      Phone: UserDetails?.Phone || "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  // stil not workking
  const onSubmit = async (data) => {
    try {
      const res = await UseEditUserData({
        ...data,
        Picture: img,
        oldEmail: UserDetails?.Email,
      });

      if (res) {
        setUserDetails(res?.user);
        nav(ROUTES.ROOT);
      }
      setIsEditing(false);
      navigator;
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      reset();
    }
  };
  console.log(errors);
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
                      src={img}
                      alt={UserDetails?.Name}
                      sx={{ width: 150, height: 150, margin: "0 auto 20px" }}
                      onClick={() => {
                        if (isEditing) {
                          widgetRef.current?.open();
                        }
                      }}
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
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number (10 digits only)",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      disabled={!isEditing}
                      error={Boolean(errors.Phone)}
                      helperText={errors.Phone?.message}
                    />
                  )}
                />
                <Controller
                  name="Email"
                  control={control}
                  defaultValue={UserDetails?.Email || ""}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value:
                        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                      message: " Invalid Email ",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      margin="normal"
                      error={Boolean(errors.Email)}
                      helperText={errors.Email?.message}
                    />
                  )}
                />
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
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export default EditUserProfile;
