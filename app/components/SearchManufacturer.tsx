"use client";
import { SearchManufacturerProps } from "../types";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Transition,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { useState, Fragment } from "react";
import { getManufacturerIconUrl, getLocalFallbackUrl, isSimpleIconsSource } from "../lib/manufacturerLogos";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
  manufacturers,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");
  const primaryUrl = getManufacturerIconUrl(manufacturer);
  const isSimpleIcons = isSimpleIconsSource(manufacturer);
  const localFallbackUrl = getLocalFallbackUrl(manufacturer) ?? "/car-logo (3).svg";
  
  // Use primary URL if it exists, otherwise jump straight to fallback
  const logoUrl = primaryUrl ?? localFallbackUrl;

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  const firstLetter = manufacturer ? manufacturer.charAt(0).toUpperCase() : "?";

  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={(value) => setManufacturer(value ?? "")}
        immediate
      >
        <div className="w-full relative">
          <ComboboxButton className="absolute top-[14px] absolute left-[14px]">
            <ImageWithSkeleton
              key={manufacturer}
              src={logoUrl}
              fallbackSrc={localFallbackUrl}
              fallbackClassName="ml-4 object-contain"
              fallbackComponent={
                <div className="ml-4 w-5 h-5 rounded-full bg-cyan-300 text-white flex items-center justify-center text-[10px] font-bold">
                  {firstLetter}
                </div>
              }
              width={20}
              height={20}
              className={isSimpleIcons ? "ml-4 invert brightness-200" : "ml-4 object-contain"}
              alt={manufacturer ? `${manufacturer} logo` : "Car logo"}
            />
          </ComboboxButton>
          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions 
              anchor={{ to: "bottom start", gap: 4, padding: 8 }}
              portal
              className="dropdown__options neon-scrollbar w-[var(--input-width)] z-50"
            >
              {filteredManufacturers.map((item) => (
                <ComboboxOption
                  key={item}
                  value={item}
                  className={({ focus }) => `
                    dropdown__option 
                    ${focus ? " bg-cyan-300 text-white" : "text-white"}
                    `}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {item}
                      </span>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-pribg-primary-purple"}`}
                        >
                          ✓
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
