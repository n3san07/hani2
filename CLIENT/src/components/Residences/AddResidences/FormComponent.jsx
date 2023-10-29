import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Container,
  Typography,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  city: Yup.string().required("City is required"),
  bathRoom: Yup.number().required("bathRoom is required"),
  bedRoom: Yup.number().required("bedRoom is required"),
  parking: Yup.number().required("parking is required"),
  size: Yup.number().required("House Size is required"),
  ResidencyType: Yup.string().required("Listing Type is required"),
  info: Yup.string()
    .required("Info is required")
    .min(10, "10 characters required")
    .max(300, "300 max"),
  agreeToTerms: Yup.bool().oneOf([true], "You must agree to the terms"),
});
const cities = ["jerusalem", "Aldefa", "Aldakhel"];

const FormComponent = ({ handleNext, setPropertyDetails, PropertyDetails }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // Validate on input touched
    defaultValues: {
      title: "",
      info: "",
    },
  });

  console.log(errors);

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({
      ...prev,
      title: data.title,
      city: data.city,
      ResidencyType: data.ResidencyType,
      info: data.info,
      facilities: {
        size: data.size,
        parking: data.parking,
        bedRoom: data.bedRoom,
        bathRoom: data.bathRoom,
      },
    }));
    handleNext();
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Property Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="title"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.city}>
                  <InputLabel>City</InputLabel>
                  <Select {...field} variant="outlined">
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.city?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="bathRoom-slider" gutterBottom>
              bathRoom: {errors.bathRoom ? errors.bathRoom.message : ""}
            </Typography>
            <Controller
              name="bathRoom"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={4}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="bedRoom-slider" gutterBottom>
              bedRoom: {errors.bedRoom ? errors.bedRoom.message : ""}
            </Typography>
            <Controller
              name="bedRoom"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={4}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="parking-slider" gutterBottom>
              parking: {errors.parking ? errors.parking.message : ""}
            </Typography>
            <Controller
              name="parking"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={4}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="size-slider" gutterBottom>
              House Size (sqm): {errors.size ? errors.size.message : ""}
            </Typography>
            <Controller
              name="size"
              control={control}
              defaultValue={100}
              render={({ field }) => (
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={25}
                  marks
                  min={50}
                  max={1000}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="ResidencyType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.ResidencyType}>
                  <InputLabel>Listing Type</InputLabel>
                  <Select {...field} variant="outlined">
                    <MenuItem value="Sale">For Sale</MenuItem>
                    <MenuItem value="Rent">For Rent</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.ResidencyType?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="info"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  minRows={3}
                  placeholder="Additional Information"
                  style={{ width: "100%" }}
                />
              )}
            />
            <Typography variant="caption" color="error">
              {errors.info?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="agreeToTerms"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox {...field} color="primary" />
                  )}
                />
              }
              label="I agree to the terms and conditions"
            />
            <Typography variant="caption" color="error">
              {errors.agreeToTerms?.message}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Last Step
        </Button>
      </form>
    </Container>
  );
};

export default FormComponent;
