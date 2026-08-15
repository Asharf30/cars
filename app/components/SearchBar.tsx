"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";
import CustomListbox from "./CustomListbox";
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
        <CustomListbox
          value={selectedYear}
          options={years}
          placeholder="Year"
          onChange={handleYearChange}
          buttonClassName="searchbar__input flex justify-between items-center"
          isSearchbar={true}
        />
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
          <CustomListbox
            value={selectedModel}
            options={models}
            placeholder="Model"
            onChange={handleModelChange}
            buttonClassName="searchbar__input flex justify-between items-center"
            isSearchbar={true}
          />
        </div>
      )}
    </form>
  );
};

export default SearchBar;
