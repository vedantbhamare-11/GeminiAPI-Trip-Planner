export const fetchCityImages = async (cities) => {
  // Hardcoded Unsplash API key for debugging purposes
  const apiKey = "BaAOs9PVix8v5rM2UGTPXStxfQFMqoyT2T2wm5ARVJs";
  const promises = cities.map((city) => {
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          return {
            city,
            imageUrl: data.results[0].urls.small,
          };
        } else {
          return {
            city,
            imageUrl: "https://via.placeholder.com/400",
          };
        }
      });
  });
  return Promise.all(promises);
};
