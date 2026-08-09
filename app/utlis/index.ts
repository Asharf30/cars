import { Car } from "../types";

export async function fetchCars(): Promise<Car[]> {
  const headers = {
    "x-rapidapi-key": "947c9c3197msh58749e1adeda1a3p1046d7jsn75a1aec5809d",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
      { headers: headers },
    );

    if (!response.ok) {
      console.error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      console.error("Unexpected API response shape:", result);
      return [];
    }

    return result as Car[];
  } catch (error) {
    console.error("fetchCars error:", error);
    return [];
  }
}
