"use client";

import CustomButton from "./CustomButton";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { motion } from "framer-motion";

const Hero = () => {
  const handelScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-[200px] sm:pt-[240px] lg:pt-[280px] padding-x">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Find, book, rent a car—quick and super easily!
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Streamline your car rental experience with our effortless booking
          process.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{marginTop:"25px"}}
        >
          <CustomButton
            title="Explore Cars"
            continerStyles="text-white rounded-full mt-10"
            handelClick={handelScroll}
          />
        </motion.div>
      </div>
      <motion.div
        className="hero__image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <div className="hero__image">
          <ImageWithSkeleton src="/final2.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay " />
      </motion.div>
    </div>
  );
};

export default Hero;
