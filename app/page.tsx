import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CustomFilter from "./components/CustomFilter";

export default function Home() {
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
      </div>
    </main>
  );
}
