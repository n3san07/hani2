import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

const StyledIcon = styled("div")(({ theme }) => ({
  color: "#FF9E45",
  backgroundImage: "radial-gradient(at center top, #D7D3DC, #FFFFFF)",
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        backgroundImage: "linear-gradient(135deg, #F2DA9F, #E0AD6B)",
      }}
    >
      <StyledIcon>{icon}</StyledIcon>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
