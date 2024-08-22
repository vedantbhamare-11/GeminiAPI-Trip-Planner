export const parseItinerary = (itineraryText) => {
  let cleanedText = itineraryText.trim();

  cleanedText = cleanedText.replace(/^\* /gm, "");

  const result = { heading: "", days: [] };

  const headingMatch = cleanedText.match(/^##\s*(.*?)\n/);
  if (headingMatch) {
    result.heading = headingMatch[1].trim();
  }

  const dayRegex =
    /\*\*Day (\d+):?\s*\*\*([\s\S]*?)(?=\*\*Day \d+:?\s*\*\*|$)/g;
  let match;

  while ((match = dayRegex.exec(cleanedText)) !== null) {
    const dayNumber = match[1];
    const dayContent = match[2].trim();

    const places = dayContent
      .split("\n")
      .filter((place) => place.trim() !== "");
    const day = { title: `Day ${dayNumber}`, places: [] };

    places.forEach((place) => {
      const [placeTitle, ...descriptionParts] = place.split(" - ");
      const description = descriptionParts.join(" - ").trim();
      if (placeTitle) {
        day.places.push({
          title: placeTitle.trim(),
          description: description,
        });
      }
    });

    result.days.push(day);
  }

  return result;
};
