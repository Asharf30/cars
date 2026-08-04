"use client";
import { motion } from "framer-motion";
import { CustomButtonProps } from "../types";

const CustomButton = ({
  title,
  continerStyles,
  handelClick,
  btnType,
}: CustomButtonProps) => {
  return (
    <motion.button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${continerStyles} cursor-pointer`}
      onClick={handelClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="flex-1">{title}</span>
    </motion.button>
  );
};

export default CustomButton;
