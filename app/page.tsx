import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CustomFilter from "./components/CustomFilter";
import { fetchCars } from "./utlis";
import CarCard from "./components/CarCard";

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length === 0;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-4xl">Car Catalogue </h1>
          <p>
            Explore our wide range of vehicles and find the perfect car for your
            needs.
          </p>
        </div>
        <div className="home__filters">
          <SearchBar />{" "}
          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="Year" />
          </div>
        </div>

        {isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (
                <CarCard car={car}  key={car.id}/>
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Not Available Cars</h2>
            <p>No results found</p>
          </div>
        )}
      </div>
    </main>
  );
}
