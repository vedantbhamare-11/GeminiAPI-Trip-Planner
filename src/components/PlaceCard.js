import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  CircularProgress,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { fetchPlaceInfo } from "../lib/gemini";

const PlaceCard = ({ title, description }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleFetchInfo = async () => {
    const placeName = title.replace(":", "").trim();

    if (placeName) {
      setLoading(true);
      try {
        const placeInfo = await fetchPlaceInfo(placeName);
        setInfo(placeInfo);
      } catch (error) {
        console.error("Error fetching place info:", error);
        setInfo("Error fetching information.");
      }
      setLoading(false);
    } else {
      setInfo("No place name found.");
    }

    setExpanded(!expanded);
  };

  const handleViewOnMap = () => {
    const placeName = title.replace(":", "").trim();
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      placeName
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: 8,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">
          <ReactMarkdown>{title}</ReactMarkdown>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Typography>
        <Button
          onClick={handleFetchInfo}
          variant="contained"
          sx={{
            borderRadius: "10px",
            marginTop: 2,
            borderColor: "primary.main",
            color: "#fff",
            "&:hover": { borderColor: "primary.dark", color: "#fff" },
          }}
        >
          {expanded ? "Hide Info" : "Show Info"}
        </Button>
        <Button
          onClick={handleViewOnMap}
          color="secondary"
          variant="contained"
          sx={{
            borderRadius: "10px",
            marginTop: 2,
            marginLeft: 2,
            borderColor: "secondary.main",
            color: "#fff",
            "&:hover": { borderColor: "secondary.dark", color: "#fff" },
          }}
        >
          View on Map
        </Button>
        <Collapse in={expanded} sx={{ marginTop: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            info && (
              <Typography variant="body2">
                <ReactMarkdown>{info}</ReactMarkdown>
              </Typography>
            )
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
