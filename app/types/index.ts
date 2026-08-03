import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  continerStyles?: string;
  handelClick?: MouseEventHandler<HTMLButtonElement>;
}
