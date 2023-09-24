import React from "react";
import { Card, Divider, Chip } from "@mui/material";
import ActionAreaCopm from "./ActionAreaCopm";
import CardButtonComp from "./CardButtonComp";
import { motion, AnimatePresence } from "framer-motion";

const CardComp = ({ likedIDarray,card }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          width: 300,
          m: 2,
          textTransform: "capitalize",
        }}
        square
        raised
      >
        <ActionAreaCopm card={card} />
        <Divider>
          <Chip
            sx={{ bgcolor: "rgb(255,158,69)", color: "white" }}
            label={card.ResidencyType}
          />
        </Divider>
        <CardButtonComp likedIDarray={likedIDarray} card={card} />

        <Divider />
      </Card>
    </motion.div>
  );
};
export default CardComp;
