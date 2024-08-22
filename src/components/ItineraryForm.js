import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { generateItinerary } from "../lib/gemini";
import { parseItinerary } from "../lib/parseItinerary";
import ItineraryDisplay from "./ItineraryDisplay";

const ItineraryForm = () => {
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
  const [style, setStyle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const prompt = `Suggest me places to visit for a ${duration}-day trip in ${destination} focused on ${style} places. Also Make Sure the output of the prompt should be like this "Itinerary Heading, Day(1), Place(1)-Small Discription(1), Place(2)-Small Dispription(2),...Day(2),...." i want this consistency in every output, also avoid any bullet points in the output`;
    try {
      const data = await generateItinerary(prompt);
      const parsedData = parseItinerary(data);
      setResult(parsedData);
    } catch (error) {
      setResult(null);
      console.error("Error generating itinerary:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "850px",
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: "cursive",
          color: "#33873d",
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
        Discover Your Perfect Trip!
        <span
          role="img"
          aria-label="sunflower"
          style={{ fontSize: "1.5em", marginLeft: "0.5em" }}
        >
          &#127796;
        </span>
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "cursive", color: "#2a79e8" }}
      >
        An unforgettable adventure tailored just for you.
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          margin="normal"
          required
          sx={{
            maxWidth: "250px",
            borderRadius: "15px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <InputLabel>Trip Duration</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Trip Duration"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <MenuItem key={day} value={day}>
                {day} Day{day > 1 ? "s" : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Trip Destination"
          fullWidth
          margin="normal"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          sx={{
            maxWidth: "250px",
            borderRadius: "15px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginLeft: "20px",
          }}
        />

        <FormControl
          fullWidth
          margin="normal"
          required
          sx={{
            maxWidth: "250px",
            borderRadius: "15px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginLeft: "20px",
          }}
        >
          <InputLabel>Trip Style</InputLabel>
          <Select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            label="Trip Style"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {[
              "Relaxation",
              "Nature",
              "Historical/Cultural",
              "Adventure",
              "Family-Friendly",
            ].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            marginTop: 2,
            width: "25%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "15px",
            textTransform: "none",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Generate Itinerary"
          )}
        </Button>
      </form>
      {result && <ItineraryDisplay itinerary={result} />}
    </Box>
  );
};

export default ItineraryForm;
