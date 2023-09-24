import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const ReadMoreTypography = ({ variant, text, maxChars }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  const displayText = showFullText ? text : text.slice(0, maxChars);

  return (
    <Typography variant={variant} color="initial">
      {displayText}
      {text.length > maxChars && !showFullText && (
        <Link
          sx={{ fontSize: "15px", paddingLeft: "10px", color: "#ff9e45" }}
          component="button"
          onClick={toggleReadMore}
        >
          Read More
        </Link>
      )}
    </Typography>
  );
};

export default ReadMoreTypography;
