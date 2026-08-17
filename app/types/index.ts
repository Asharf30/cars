import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  continerStyles?: string;
  classname?: string;
  textStyles?: string;
  handelClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
  manufacturers: string[];
}

export interface CarProps {
  id: number;
  year: number;
  city_mpg: number | string;
  class: string;
  combination_mpg: number | string;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number | string;
  make: string;
  model: string;
  transmission: string;
  imageUrl?: string | null;
  imageUrls?: string[];
}

export interface SearchYearProps {
  year: string;
  setYear: (year: string) => void;
}
