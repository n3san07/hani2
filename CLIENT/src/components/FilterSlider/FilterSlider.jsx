import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const FilterSlider = ({ isDrawerOpen, toggleDrawer }) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCity, setSelectedCity] = useState("");
  const [saleRent, setSaleRent] = useState("");
  const filterData = () => {
    toggleDrawer();
    nav(
      `/${ROUTES.FILTERRESIDENCES}?price=${priceRange}&city=${selectedCity}&state=${saleRent}`
    );
  };

  const nav = useNavigate();

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <List
        sx={{
          minWidth: "10vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <ListItem>
          <ListItemText primary="Filter Options" />
        </ListItem>
        <Divider />
        <ListItem>
          <FormControl fullWidth>
            <InputLabel sx={{ pt: 2 }}>Price Range</InputLabel>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              step={500}
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="jerusalem">jerusalem</MenuItem>
              <MenuItem value="Aldefa">Aldefa</MenuItem>
              <MenuItem value="Aldakhel">Aldakhel</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel>Rent/Sale</InputLabel>
            <Select
              value={saleRent}
              onChange={(event) => setSaleRent(event.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Button
        sx={{ marginTop: "40vh", border: "0.2rem outset #ff9e45" }}
        variant="contained"
        color="primary"
        onClick={filterData}
      >
        Apply Filters
      </Button>
    </Drawer>
  );
};

export default FilterSlider;
