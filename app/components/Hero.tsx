"use client";

import CustomButton from "./CustomButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { TiltWrapper } from "./TiltWrapper";

const Hero = () => {
  const handelScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-[200px] sm:pt-[240px] xl:pt-[280px] padding-x" style={{ perspective: 1000 }}>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "bottom" }}
        >
          Find, book, rent a car—quick and super easily!
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 24, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1, type: "spring", bounce: 0.3 }}
          style={{ transformOrigin: "bottom" }}
        >
          Streamline your car rental experience with our effortless booking
          process.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.8, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2, type: "spring", bounce: 0.4 }}
          style={{ marginTop: "2rem", transformOrigin: "bottom" }}
        >
          <CustomButton
            title="Explore Cars"
            continerStyles="bg-primary-blue text-white rounded-full mt-15"
            handelClick={handelScroll}
          />
        </motion.div>
      </div>
      <motion.div
        className="hero__image-container"
        initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{ perspective: 1200 }}
      >
        <TiltWrapper className="hero__image">
          <Image 
            src="/final2.png" 
            alt="hero" 
            fill 
            className="object-contain" 
            style={{ transform: "translateZ(50px)", transition: "transform 0.3s ease" }} 
          />
        </TiltWrapper>
        <div className="hero__image-overlay " />
      </motion.div>
    </div>
  );
};

export default Hero;
