import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import PlaceCard from "./PlaceCard";
import { fetchCityImages } from "../lib/fetchCityImages";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ItineraryDisplay = ({ itinerary }) => {
  const [cityImages, setCityImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const cities = [
    "Paris",
    "New York",
    "Bangkok",
    "London",
    "Dubai",
    "Tokyo",
    "Istanbul",
    "Barcelona",
  ];

  useEffect(() => {
    const getRandomCities = () => {
      const shuffled = cities.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    const fetchImages = async () => {
      const randomCities = getRandomCities();
      try {
        const images = await fetchCityImages(randomCities);
        setCityImages(images);
      } catch (error) {
        console.error("Error fetching city images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const cityName = itinerary.heading.split(" ")[0];

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}${day}${year}`;
  };

  const today = new Date();
  const checkinDate = formatDate(
    new Date(today.getTime() + 24 * 60 * 60 * 1000)
  );
  const checkoutDate = formatDate(
    new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
  );

  const makeMyTripUrl = `https://www.makemytrip.com/hotels/hotel-listing/?checkin=${checkinDate}&checkout=${checkoutDate}&roomStayQualifier=2e0e&locusId=CTDEL&country=IN&locusType=city&searchText=${cityName}&regionNearByExp=3&rsc=1e2e0e`;

  const handleGeneratePDF = async () => {
    const input = document.getElementById("itinerary-container");
    if (!input) {
      console.error("Element not found: itinerary-container");
      return;
    }

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("itinerary.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "cursive",
          fontWeight: "bold",
          color: "#3f51b5",
          marginBottom: 4,
          padding: 2,
        }}
      >
        {itinerary.heading}
      </Typography>
      <Box id="itinerary-container">
        {itinerary.days.map((day, index) => (
          <Card
            key={index}
            sx={{ marginBottom: 4, boxShadow: 3, borderRadius: 8, padding: 2 }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {day.title}
              </Typography>
              {day.places.map((place, idx) => (
                <PlaceCard
                  key={idx}
                  title={place.title}
                  description={place.description}
                  sx={{
                    marginBottom: 2,
                    padding: "12px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    "&:last-child": { marginBottom: 0 },
                  }}
                />
              ))}
            </CardContent>
            <Box
              sx={{
                marginTop: 2,
                marginBottom: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                href={makeMyTripUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "10px",
                  boxShadow: 2,
                  textTransform: "none",
                  padding: "8px 16px",
                  fontSize: "16px",
                }}
              >
                Book Hotels
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneratePDF}
                sx={{
                  borderRadius: "10px",
                  boxShadow: 2,
                  textTransform: "none",
                  padding: "8px 16px",
                  fontSize: "16px",
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "cursive",
            marginBottom: 2,
            fontWeight: "bold",
            color: "#3f51b5",
          }}
        >
          Recommended Cities
        </Typography>
        <Grid container spacing={2}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            cityImages.map(({ city, imageUrl }) => (
              <Grid item xs={12} sm={6} md={3} key={city}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${city}`,
                      "_blank"
                    )
                  }
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={city}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      {city}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ItineraryDisplay;
