"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";
import { MenuItem } from "../utlis";

interface SearchBarProps {
  years: MenuItem[];
  makes: MenuItem[];
  models: MenuItem[];
  selectedYear: string;
  selectedMake: string;
  selectedModel: string;
}

const SearchBar = ({
  years,
  makes,
  models,
  selectedYear,
  selectedMake,
  selectedModel,
}: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper: update one param, optionally clear dependent params
  const updateParams = (updates: Record<string, string>, clearKeys: string[] = []) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of clearKeys) {
      params.delete(key);
    }
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleYearChange = (year: string) => {
    // Changing year clears make and model (they depend on year)
    updateParams({ year }, ["make", "model"]);
  };

  const handleMakeChange = (make: string) => {
    // Changing make clears model (it depends on make)
    updateParams({ make }, ["model"]);
  };

  const handleModelChange = (model: string) => {
    updateParams({ model });
  };

  return (
    <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
      {/* Year selector */}
      <div className="searchbar__item">
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="searchbar__input"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y.value} value={y.value}>{y.text}</option>
          ))}
        </select>
      </div>

      {/* Manufacturer combobox (existing, now dynamic) */}
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={selectedMake}
          setManufacturer={handleMakeChange}
          manufacturers={makes.map((m) => m.text)}
        />
      </div>

      {/* Model selector (only shown when year+make are selected) */}
      {models.length > 0 && (
        <div className="searchbar__item">
          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className="searchbar__input"
          >
            <option value="">Model</option>
            {models.map((m) => (
              <option key={m.value} value={m.value}>{m.text}</option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
