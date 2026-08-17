"use client";

import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const [isHoverable, setIsHoverable] = useState(true);
  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEnabled = !shouldReduceMotion && isHoverable;

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="navbar__inner">
        <Link 
          href="/" 
          ref={ref}
          onMouseMove={isEnabled ? handleMouseMove : undefined}
          onMouseLeave={isEnabled ? handleMouseLeave : undefined}
          className="flex justify-center items-center relative group p-4 -ml-4"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{
              rotateX: isEnabled ? rotateX : 0,
              rotateY: isEnabled ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            className="relative flex justify-center items-center"
          >
            <ImageWithSkeleton
              src="/logo.svg"
              alt="Logo"
              width={118}
              height={18}
              className="object-contain"
              title="CarHub"
            />
            {isEnabled && (
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  WebkitMaskImage: "url('/logo.svg')",
                  maskImage: "url('/logo.svg')",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                } as React.CSSProperties}
              >
                <motion.div 
                  className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-gradient-to-tr from-transparent via-[color-mix(in_srgb,var(--color-neon-cyan)_30%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    x: sheenX,
                    y: sheenY,
                  }}
                />
              </div>
            )}
          </motion.div>
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          continerStyles="text-white rounded-full min-w-[130px]"
        />
      </nav>
    </motion.header>
  );
};

export default Navbar;
