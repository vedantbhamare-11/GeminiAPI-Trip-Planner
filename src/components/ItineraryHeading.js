import { Typography } from "@mui/material";

const ItineraryHeading = ({ heading }) => (
  <Typography
    variant="h4"
    sx={{
      marginBottom: 4,
      padding: 2,
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    {heading}
  </Typography>
);

export default ItineraryHeading;
