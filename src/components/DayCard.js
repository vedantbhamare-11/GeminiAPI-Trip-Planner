import { Card, CardContent, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import PlaceCard from "./PlaceCard";

const DayCard = ({ title, places }) => (
  <Card
    sx={{
      marginTop: 4,
      padding: 3,
      borderRadius: "8px",
      marginBottom: 4,
      boxShadow: 3,
      borderRadius: 3,
      border: "1px solid #e0e0e0",
      "&:hover": {
        transform: "scale(1.02)",
        transition: "transform 0.2s ease-in-out",
      },
    }}
  >
    <CardContent sx={{ padding: "16px 24px" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          marginBottom: 2,
        }}
      >
        <ReactMarkdown>{title}</ReactMarkdown>
      </Typography>
      {places.map((place, idx) => (
        <PlaceCard
          key={idx}
          title={place.title}
          description={place.description}
          sx={{
            marginBottom: 2,
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            "&:last-child": {
              marginBottom: 0,
            },
          }}
        />
      ))}
    </CardContent>
  </Card>
);

export default DayCard;
