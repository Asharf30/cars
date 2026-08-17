"use client";
import { motion } from "framer-motion";
import { CustomButtonProps } from "../types";
import ImageWithSkeleton from "./ImageWithSkeleton";
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
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className={`flex-1 ${textStyles || ""}`}>{title}</span>
      {rightIcon && (
        <div className="w-6 relative h-6">
          <ImageWithSkeleton
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
