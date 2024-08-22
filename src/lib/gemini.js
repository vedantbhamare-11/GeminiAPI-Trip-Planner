import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

export const generateItinerary = async (prompt) => {
  try {
    const response = await axios.post(
      BASE_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: API_KEY },
      }
    );

    if (response.data?.candidates && response.data.candidates.length > 0) {
      const content = response.data.candidates[0].content?.parts?.[0]?.text;
      if (content) {
        return content;
      }
    }

    throw new Error("Unexpected response format");
  } catch (error) {
    console.error(
      "Error generating itinerary:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchPlaceInfo = async (placeName) => {
  const prompt = `Give me detailed information about ${placeName}.`;

  try {
    const response = await axios.post(
      BASE_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: API_KEY },
      }
    );

    if (response.data?.candidates && response.data.candidates.length > 0) {
      const content = response.data.candidates[0].content?.parts?.[0]?.text;
      if (content) {
        return content;
      }
    }

    console.error("Response structure unexpected:", response.data);
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error(
      "Error fetching place info:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
