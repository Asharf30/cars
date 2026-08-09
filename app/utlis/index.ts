export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": !process.env.RAPIDAPI_KEY
      ? "YOUR_RAPIDAPI_KEY"
      : process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers: headers },
  );
  const result = await response.json();
  return result;
}
