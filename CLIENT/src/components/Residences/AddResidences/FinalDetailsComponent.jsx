import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useContext } from "react";
import UserDetailsContext from "../../../context/UserDetailsContext";

const FinalDetailsComponent = ({
  handleBack,
  handlClose,
  setPropertyDetails,
  PropertyDetails,
  handleReset,
  SendTObackEnd,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched", // Validate on input touched
    defaultValues: {
      name: "",
      phoneNumber: "",
      price: "",
      flexiblePrice: false,
    },
  });

  const { UserDetails } = useContext(UserDetailsContext);

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({
      ...prev,
      ownerName: data.name,
      phone: data.phoneNumber,
      price: data.price,
      flexiblePrice: data.flexiblePrice,
      owner: UserDetails?.Email,
    }));

    SendTObackEnd();
  };

  return (
    <>
      <Box sx={{ m: 3 }} textAlign="center">
        <Typography variant="body1" color="initial">
          {" "}
          Lets Get Series{" "}
        </Typography>
      </Box>
      <Paper elevation={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ p: 2 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ p: 2 }}>
            <Controller
              name="phoneNumber"
              control={control}
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
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ p: 2 }}>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Invalid price (numbers only)",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  variant="outlined"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₪</InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ p: 2 }}>
            <FormControlLabel
              control={
                <Controller
                  name="flexiblePrice"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              }
              label="Flexible with the price"
            />
          </Box>

          <Box sx={{ p: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default FinalDetailsComponent;
