import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ExpandSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        style={{
          borderRadius: "5px",
          paddingLeft: "5px",
          paddingRight: "5px",
          border: "1px solid #ccc",
        }}
      >
        <Typography variant="subtitle2" textAlign="left">
          {title}
        </Typography>
        <IconButton onClick={toggleExpand}>
          {expanded ? (
            <CloseIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
      {expanded && (
        <Box>
          {React.Children.map(children, (child) => (
            <Box mb={1}>{child}</Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ExpandSection;
