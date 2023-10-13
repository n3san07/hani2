import * as React from "react";
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
import { UseLogIn } from "../../hooks/UseUser";
import { useContext } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
export default function SignUp() {
  const { setUserDetails, UserDetails } = useContext(UserDetailsContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
  const onSubmit = async (data) => {
    try {
      // dont need it just for extra protection
  
      await setUserDetails(null);
      const user = { ...data };
      const res = await UseLogIn(user);
      await setUserDetails(res);
      navigate(ROUTES.ROOT);
    } catch (error) {
      if (error.response) {
        setError("email", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            minHeight: "60vh",

            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  autoComplete="Email"
                  error={Boolean(errors?.Email)}
                  helperText={errors?.Email?.message}
                  {...register("Email", {
                    pattern: {
                      value:
                        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                      message: "email is not valid ",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="Password"
                  error={Boolean(errors?.Password)}
                  helperText={errors?.Password?.message}
                  autoComplete="password"
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
              Login
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(ROUTES.SIGNUP);
                  }}
                  variant="body2"
                >
                  dont have account? Sign up
                </Typography>
                {errors.email && <p>{errors.email.message}</p>}
              </Grid>
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(ROUTES.FORGETPASSWORD);
                  }}
                  variant="body2"
                >
                  forget password?
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
