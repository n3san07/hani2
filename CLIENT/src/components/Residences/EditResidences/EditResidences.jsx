import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../providers/Loading";
import NotFound from "../../errorPage/Error";
import { getEditP, sendEditD, deleteP } from "../../../hooks/UseProperties";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ROUTES from "../../../routes/routesModel";
const EditResidences = () => {
  const { id } = useParams();
  const { data, isError, isLoading, refetch } = getEditP(id);
  const nav = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rules = {
    title: { required: true },
    phone: { required: true, pattern: /^\d{10}$/ },
    city: { required: true },
    price: { required: true, min: 0 },
    ownerName: { required: true },
    info: { required: true },
    ResidencyType: { required: true },
    size: { required: true, min: 0 },
    parking: { required: true },
    bedRoom: { required: true, min: 0 },
    bathRoom: { required: true, min: 0 },
  };

  const residencyTypes = ["Rent", "Sale"];
  const city = ["jerusalem", "Aldefa", "Aldakhel"];
  const onSubmit = async (editedData) => {
    await sendEditD({ ...editedData, id });
    nav(`/${ROUTES.RESIDENCES}/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <Paper>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{ pt: 5, gap: 2 }}
      >
        <Typography variant="h4" align="center">
          Edit Data{" "}
        </Typography>{" "}
        <EditNoteRoundedIcon fontSize="large" />
      </Box>
      <Box className="edit-form" sx={{ p: 7, gap: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                defaultValue={data?.title || ""}
                rules={rules.title}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    helperText={errors.title ? "Title is required" : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue={data?.phone || ""}
                rules={rules.phone}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    helperText={
                      errors.phone
                        ? "Phone must be a valid 10-digit number"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                defaultValue={data?.city || ""}
                rules={rules.city}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="city"
                    variant="outlined"
                    fullWidth
                    error={!!errors.city}
                  >
                    {city.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                defaultValue={data?.price || ""}
                rules={rules.price}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="outlined"
                    type="number"
                    fullWidth
                    helperText={
                      errors.price ? "Price must be a positive number" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="ownerName"
                control={control}
                defaultValue={data?.ownerName || ""}
                rules={rules.ownerName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Owner Name"
                    variant="outlined"
                    fullWidth
                    helperText={
                      errors.ownerName ? "Owner Name is required" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="info"
                control={control}
                defaultValue={data?.info || ""}
                rules={rules.info}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Info"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    helperText={errors.info ? "Info is required" : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="ResidencyType"
                control={control}
                defaultValue={data?.ResidencyType || ""}
                rules={rules.ResidencyType}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Residency Type"
                    variant="outlined"
                    fullWidth
                    error={!!errors.ResidencyType}
                  >
                    {residencyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="size"
                control={control}
                defaultValue={data?.facilities.size || ""}
                rules={rules.size}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Size"
                    variant="outlined"
                    type="number"
                    fullWidth
                    helperText={
                      errors.size ? "Size must be a positive number" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parking"
                control={control}
                defaultValue={data?.facilities.parking || ""}
                rules={rules.parking}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="parking"
                    variant="outlined"
                    type="number"
                    fullWidth
                    helperText={
                      errors.parking ? "Size must be a positive number" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="bedRoom"
                control={control}
                defaultValue={data?.facilities.bedRoom || ""}
                rules={rules.bedRoom}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bed Room"
                    variant="outlined"
                    type="number"
                    fullWidth
                    helperText={
                      errors.bedRoom ? "Bed Room must be a positive number" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="bathRoom"
                control={control}
                defaultValue={data?.facilities.bathRoom || ""}
                rules={rules.bathRoom}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bath Room"
                    variant="outlined"
                    type="number"
                    fullWidth
                    helperText={
                      errors.bathRoom
                        ? "Bath Room must be a positive number"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="error"
                sx={{ mt: 3 }}
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this?")) {
                    deleteP(data?._id);
                    nav(`${ROUTES.MYRESIDENCES}`)
                  }
                }}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default EditResidences;
