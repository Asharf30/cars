"use client";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface CustomListboxProps {
  value: string;
  options: { text: string; value: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  buttonClassName?: string;
  isSearchbar?: boolean;
}

const CustomListbox = ({
  value,
  options,
  placeholder,
  onChange,
  buttonClassName = "custom-filter__btn",
  isSearchbar = false,
}: CustomListboxProps) => {
  const allOptions = placeholder
    ? [{ text: placeholder, value: "" }, ...options]
    : options;

  const selectedOption = allOptions.find((opt) => opt.value === value) || allOptions[0];

  return (
    <div className="w-full relative">
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className={buttonClassName}>
          <span className="block truncate text-left">{selectedOption?.text}</span>
          {!isSearchbar && (
             <span className="text-[#a69cac] text-xs">▼</span>
          )}
        </ListboxButton>
        
        <ListboxOptions
          anchor={{ to: "bottom start", gap: 4, padding: 8 }}
          portal
          className="dropdown__options neon-scrollbar w-[var(--button-width)] z-50"
        >
          {allOptions.map((opt, index) => (
            <ListboxOption
              key={index}
              value={opt.value}
              className={({ focus, selected }) => `
                dropdown__option
                ${focus ? "bg-cyan-300 text-white" : "text-white"}
                ${selected ? "font-medium" : "font-normal"}
              `}
            >
              {({ selected }) => (
                <span className={`block truncate ${selected ? "font-bold text-[#00f3ff]" : ""}`}>
                  {opt.text}
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default CustomListbox;
