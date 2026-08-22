import { Suspense } from "react";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CustomFilter from "./components/CustomFilter";
import ResetFiltersButton from "./components/ResetFiltersButton";
import { fetchCars, fetchYears, fetchMakes, fetchModels, attachCarImages } from "./utlis";
import { fuels } from "./contstants";
import CarCard from "./components/CarCard";
import { CarProps } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Read URL search params (Next.js 16: must await)
  const params = await searchParams;
  const year = typeof params.year === "string" ? params.year : "";
  const make = typeof params.make === "string" ? params.make : "";
  const model = typeof params.model === "string" ? params.model : "";
  const fuel = typeof params.fuel === "string" ? params.fuel : "";

  // Drill-down: fetch only what's needed based on current selections
  const years = await fetchYears();
  const makes = year ? await fetchMakes(year) : [];
  const models = year && make ? await fetchModels(year, make) : [];

  let allCars: CarProps[] = [];
  if (year && make && model) {
    const rawCars = await fetchCars(year, make, model);
    // Attach image URLs server-side — key stays in process.env, never reaches the browser
    allCars = await attachCarImages(rawCars);
  }

  const filteredCars = fuel
    ? allCars.filter((car) => car.fuel_type === fuel)
    : allCars;

  const isDataEmpty = filteredCars.length === 0;

  let emptyMessage = "No results found";
  if (!year) {
    emptyMessage = "Select a year to start browsing";
  } else if (!make) {
    emptyMessage = "Select a manufacturer";
  } else if (!model) {
    emptyMessage = "Select a model to see results";
  }

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-4xl">Car Catalogue</h1>
          <p>Explore our wide range of vehicles...</p>
        </div>
        <div className="home__filters">
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchBar
              years={years}
              makes={makes}
              models={models}
              selectedYear={year}
              selectedMake={make}
              selectedModel={model}
            />
          </Suspense>
          <div className="home__filter-container">
            <Suspense fallback={<div>Loading Filters...</div>}>
              <CustomFilter title="Fuel" options={fuels} paramKey="fuel" />
            </Suspense>
            <Suspense fallback={null}>
              <ResetFiltersButton />
            </Suspense>
          </div>
        </div>

        {isDataEmpty ? (
          <div className="home__error-container">
            <h2 className="text-white text-xl font-bold">{emptyMessage}</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {filteredCars.map((car) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
