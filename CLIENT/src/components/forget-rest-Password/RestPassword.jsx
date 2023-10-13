import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Paper } from "@mui/material";
import { getSingleUser } from "../../hooks/UseUser";
import NotFound from "../errorPage/Error";
import Loading from "../../providers/Loading";
import { updatePassword } from "../../services/api";
const RestPassword = () => {
  const { token } = useParams();
  const { data, isError, isLoading, refetch } = getSingleUser(token);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const pass = data.Password;
      await updatePassword(pass, token);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };
  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return <Loading />;
  }

  if (data && !isError && !isLoading) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                minHeight: "72vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                sx={{ width: 120, height: 120, m: 1.2 }}
                src={data?.Picture}
              />

              <Typography component="h1" variant="h5">
                {data?.Name}
              </Typography>
              <Typography textAlign="center" sx={{ m: 3 }} variant="caption">
                IF This Your Account you can change your password
                <br />
                <br />
                IF thats not your account contact with us
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="Password"
                      label="New Password"
                      name="Password"
                      error={Boolean(errors?.Password)}
                      helperText={errors?.Password?.message}
                      {...register("Password", {
                        minLength: {
                          value: 6,
                          message: "min is 6",
                        },
                        maxLength: {
                          value: 16,
                          message: "max is 16",
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                          message: "must have letters and numbers",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </form>
      </>
    );
  }
};

export default RestPassword;
