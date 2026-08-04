"use client";
import { CustomButtonProps } from "../types";

const CustomButton = ({
  title,
  continerStyles,
  handelClick,
  btnType,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${continerStyles} cursor-pointer`}
      onClick={handelClick}
    >
      <span className={`flex-1 `}>{title}</span>
    </button>
  );
};

export default CustomButton;
