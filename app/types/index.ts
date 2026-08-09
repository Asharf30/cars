import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  continerStyles?: string;
  classname?: string;
  handelClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
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
}