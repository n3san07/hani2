import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditUserProfile = () => {
  const { control, handleSubmit, reset } = useForm();
  const [isEditing, setIsEditing] = React.useState(false);
// stil not workking 
  const onSubmit = (data) => {
    // Handle form submission and update user data
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      reset(); // Reset the form when entering edit mode
    }
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: '20px', position: 'relative' }}>
            <Avatar
              alt="User Profile Picture"
              src="https://via.placeholder.com/150" // Placeholder image URL
              sx={{ width: 150, height: 150, margin: '0 auto 20px' }}
            />
            {isEditing && (
              <IconButton
                onClick={toggleEdit}
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                <EditIcon />
              </IconButton>
            )}

            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Controller
              name="firstName"
              control={control}
              defaultValue="John"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  disabled={!isEditing}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue="Doe"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  disabled={!isEditing}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue="johndoe@example.com"
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
                style={{ marginTop: '20px' }}
              >
                Save
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              About Me
            </Typography>
            <Controller
              name="about"
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
              Interests
            </Typography>
            <Controller
              name="interests"
              control={control}
              defaultValue="Programming, Traveling, Music"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Interests"
                  fullWidth
                  variant="outlined"
                  disabled={!isEditing}
                  margin="normal"
                />
              )}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Controller
              name="socialMedia"
              control={control}
              defaultValue="https://twitter.com/johndoe, https://linkedin.com/in/johndoe"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Social Media Links"
                  fullWidth
                  variant="outlined"
                  disabled={!isEditing}
                  margin="normal"
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditUserProfile;
