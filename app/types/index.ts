import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  continerStyles?: string;
  classname?: string;
  handelClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit"; 
}
