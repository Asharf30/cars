"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="navbar__inner">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          continerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
      </nav>
    </motion.header>
  );
};

export default Navbar;
