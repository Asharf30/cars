"use client";
import { motion } from "framer-motion";
import { CustomButtonProps } from "../types";
import Image from "next/image";
const CustomButton = ({
  title,
  continerStyles,
  handelClick,
  btnType,
  classname,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  return (
    <motion.button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${continerStyles} ${classname || ""} cursor-pointer`}
      onClick={handelClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className={`flex-1 ${textStyles || ""}`}>{title}</span>
      {rightIcon && (
        <div className="w-6 relative h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain brightness-25"
          />
        </div>
      )}
    </motion.button>
  );
};

export default CustomButton;
