"use client";

import CustomButton from "./CustomButton";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
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
          className="hero__cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <CustomButton
            title="Explore Cars"
            continerStyles=" min-w-[180px] min-h-[50px] rounded-xl border border-[#57F3FF] bg-[var(--color-neon-cyan)] px-7 py-3 text-[#07131A] text-lg font-extrabold shadow-[0_12px_30px_rgba(0,229,255,0.30)] hover:bg-[#75F4FF] hover:shadow-[0_16px_38px_rgba(0,229,255,0.45)]"
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
          <Image
            src="/final2.png"
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
        <div className="hero__image-overlay " />
      </motion.div>
    </div>
  );
};

export default Hero;
